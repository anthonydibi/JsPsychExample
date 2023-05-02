import { JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import { shuffle } from "./utils";
import { TrialKind } from "./Trial";

export class Pretask{

    async setupAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>){
        const trialConfig = {
            kind: TrialKind.PRE,
            type: jsPsychHtmlButtonResponse,
            stimulus: jsPsych.timelineVariable("stimulus"),
            choices: ['Positive', 'Negative']
        };

        const imageUrlResponse = await fetch("https://7qfbe3atn3.execute-api.us-east-1.amazonaws.com/default/get_pretask_images?task=pre-task",
            {method: "GET", mode: "cors"});
        const imageUrls: Array<string> = await imageUrlResponse.json();

        const pretaskFaces: Array<object> = [];
        for(let i = 0; i < 40; i++){
            pretaskFaces.push({stimulus: `<img src=${imageUrls[i]} alt="Pretaskyyyy" width="400" height="400`});
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