import { JsPsych } from "jspsych";
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { SurveyBlock } from "./SurveyBlock";
import { randomInt } from "./utils";

export class Catch implements SurveyBlock{

    numCatchTrials: number;

    constructor(numCatchTrials: number){
        this.numCatchTrials = numCatchTrials;
    }

    setupAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>, index: number){
        const catchConfig = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable("stimulus"),
            choices: jsPsych.timelineVariable("choices")
        };
        
        //a procedure uses a timeline variable to show a repeated series of trials. It runs the timeline once for each element in the timeline
        //variable - in this case the timeline variable is trial_faces so it will run twice if it contains two stimuli
        let catchVariables: Array<object> = [];
        for(let i = 0; i < this.numCatchTrials; i++){
            let isPositive = randomInt(0, 2);
            if(isPositive){
                catchVariables.push({
                    stimulus: '<p>Press the "s" key for positive.</p><div id="jspsych-html-button-response-btngroup"><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Positive</button></div><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Negative</button></div></div>',
                    choices: ['s']
                })
            }
            else{
                catchVariables.push({
                    stimulus: '<p>Press the "k" key for negative.</p><div id="jspsych-html-button-response-btngroup"><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Positive</button></div><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Negative</button></div></div>',
                    choices: ['k']
                })
            }
        }
        const pretask_procedure = {
            timeline: [catchConfig],
            timeline_variables: catchVariables
        };
        if(index === -1){
            timeline.push(pretask_procedure);
        }
        else{
            timeline.splice(index, 0, pretask_procedure);
        }
    }
}