import { JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import { TrialKind } from "./Trial";
import { shuffle } from "./utils";
import { randomInt } from "./utils";
import { Catch } from "./Catch";

export class MainTask{

    kind = TrialKind.MAIN;

    _every(n: number, plusMinus: number, fn: (el: any) => any, arr: Array<object>){
        let times = Math.floor(arr.length / n) - 1;
        let lastJump: number | null = null;
        let curIdx = 0;
        let firstInPair = true;
        while(times > 0){
            let jump: number;
            if(firstInPair){
                jump = randomInt(n - plusMinus, Math.min(n + plusMinus, arr.length - curIdx - 1));
                lastJump = jump;
            }
            else{
                jump = n + (n - lastJump!);
            }
            firstInPair = !firstInPair;
            console.log(jump);
            curIdx += jump;
            fn(arr.at(curIdx));
            times--;
        }
    }

    setupTrialsAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>, index: number){

        const mainTaskTrials: Array<object> = [];
        for(let i = 0; i < 120; i++){
            mainTaskTrials.push({
                kind: this.kind,
                type: jsPsychHtmlButtonResponse,
                stimulus: `<img src="maintask.png" alt="Main task" width="400" height="400" />`,
                choices: ['Positive', 'Negative']
            });
        }
        shuffle(mainTaskTrials);
        let c = new Catch();
        this._every(15, 7, c.setCatch, mainTaskTrials);
        //a procedure uses a timeline variable to show a repeated series of trials. It runs the timeline once for each element in the timeline
        //variable - in this case the timeline variable is trial_faces so it will run twice if it contains two stimuli
        timeline.push(...mainTaskTrials);
    }
}