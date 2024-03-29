import { TrialKind } from "./Trial";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response'

export class Distraction{

    addDistraction(timeline: Array<object>, index: number, src: string){
        const trial = {
            kind: TrialKind.DISTRACTION,
            type: jsPsychHtmlButtonResponse,
            stimulus: `<img src="${src}" alt="Distraction" width="400" height="400" />`,
            choices: ['Positive', 'Negative']
        }
        timeline.splice(index, 0, trial);
    };

}