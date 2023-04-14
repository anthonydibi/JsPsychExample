import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { TrialKind } from "./Trial";

export class Catch{

    setCatch(trial: any){
        trial.kind = TrialKind.CATCH;
        trial.type = jsPsychHtmlKeyboardResponse;
        trial.stimulus = `${trial.stimulus}<p>Press the "k" key for negative, or "s" for positive.</p><div id="jspsych-html-button-response-btngroup"><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Positive</button></div><div class="jspsych-html-button-response-button" style="display: inline-block; margin:0px 8px" id="jspsych-html-button-response-button-0" data-choice="0"><button class="jspsych-btn" disabled>Negative</button></div></div>`;
        trial.choices = ['s', 'k'];
    };

}