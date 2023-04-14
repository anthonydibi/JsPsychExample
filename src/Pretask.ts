import { JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import { shuffle } from "./utils";
import { TrialKind } from "./Trial";

export class Pretask{

    setupAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>, index: number){
        const trialConfig = {
            kind: TrialKind.PRE,
            type: jsPsychHtmlButtonResponse,
            stimulus: jsPsych.timelineVariable("stimulus"),
            choices: ['Positive', 'Negative']
        };

        const pretaskFaces: Array<object> = [];
        for(let i = 0; i < 40; i++){
            pretaskFaces.push({stimulus: `<img src="pretask.png" alt="Pretaskyyyy" width="400" height="400`});
        }
        shuffle(pretaskFaces);
        //a procedure uses a timeline variable to show a repeated series of trials. It runs the timeline once for each element in the timeline
        //variable - in this case the timeline variable is trial_faces so it will run twice if it contains two stimuli
        const pretask_procedure = {
            timeline: [trialConfig],
            timeline_variables: pretaskFaces
        };
        timeline.push(pretask_procedure);
    }
}