import { JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import { SurveyBlock } from "./SurveyBlock";
import { shuffle } from "./utils";
import { randomInt } from "./utils";
import { Catch } from "./Catch";

export class MainTask implements SurveyBlock{

    _putEvery(n: number, plusMinus: number, from: Array<any>, to: Array<any>){
        let times = Math.floor(to.length / n) - 1;
        let lastJump: number | null = null;
        let curIdx = 0;
        while(times-- > 0){
            let curN = n;
            if(lastJump){
                curN += n - lastJump;
            }
            let jump = randomInt(n - plusMinus, lastJump ? Math.min(n + plusMinus, n + (n - lastJump)) : n + plusMinus);
            lastJump = jump;
            to.splice(curIdx + jump, 0, from.at(from.length - times - 1));
            curIdx += jump;
        }
    }

    setupAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>, index: number){

        const mainTaskTrials: Array<object> = [];
        for(let i = 0; i < 120; i++){
            mainTaskTrials.push({
                type: jsPsychHtmlButtonResponse,
                stimulus: `<img src="maintask.png" alt="Main task" width="400" height="400`,
                choices: ['Positive', 'Negative']
            });
        }
        shuffle(mainTaskTrials);
        const catchTimeline: Array<object> = [];
        for(let i = 0; i < 7; i++){
            let catchy = new Catch(7);
            catchy.setupAndPushToTimeline(jsPsych, catchTimeline, -1);
        }
        this._putEvery(15, 7, catchTimeline, mainTaskTrials);
        //a procedure uses a timeline variable to show a repeated series of trials. It runs the timeline once for each element in the timeline
        //variable - in this case the timeline variable is trial_faces so it will run twice if it contains two stimuli
        timeline.push(...mainTaskTrials);
    }
}