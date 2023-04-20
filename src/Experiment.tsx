import { initJsPsych, JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'
import { Pretask } from "./Pretask";
import { MainTask } from "./MainTask";

export default function Experiment() {
    const jsPsych: JsPsych = initJsPsych({ on_finish: function(): void {
        jsPsych.data.displayData();
    }});

    const subject_id: string = jsPsych.data.getURLVariable('PROLIFIC_PID');
    const study_id: string = jsPsych.data.getURLVariable('STUDY_ID');
    const session_id: string = jsPsych.data.getURLVariable('SESSION_ID');

    jsPsych.data.addProperties({
        subject_id: subject_id,
        study_id: study_id,
        session_id: session_id
    });
    
    //holds each phase of the experiment in order - welcome, instructions, trial, etc..
    const timeline: Array<object> = [];

    //put the different face images to test here

    //type is the interaction plugin to use - we are using the html keyboard response here which means the stimulus is HTML
    //and the response is a keyboard input. We don't provide input choices here since the user can press any key to begin
    const welcome = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `Welcome to the experiment. Press "continue" to advance. subject_id: ${subject_id}, study_id: ${study_id}, session_id: ${session_id}`,
        choices: ['Continue'],
    }
    timeline.push(welcome);

    const instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: 'You have three choices for rating each face: positive, indicating that the person seems happy, pleased, or delighted; neutral, indicating a lack of positive or negative emotional expression; or negative, indicating that the person seems sad, afraid, angry, or disgusted. You will see faces only for a brief moment, so please respond as fast as possible. Select the most accurate description for the emotional expression on each face. If the face contains a positive emotional expression, press the "positive" button. If the face contains a neutral emotional expression, press the "neutral" button. If the face contains a negative emotional expression, press the "negative" button. Press "continue" to advance.',
        choices: ['Continue'],
    }
    timeline.push(instructions);

    let pretask = new Pretask();
    pretask.setupAndPushToTimeline(jsPsych, timeline);

    let mainTask = new MainTask();
    mainTask.setupTrialsAndPushToTimeline(jsPsych, timeline);

    const completion_page = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p>That concludes the study. Click the following link to complete.</p>
            <p><a href="https://app.prolific.co/submissions/complete?cc=C1MBJ904">Click here to return to Prolific and complete the study</a>.</p>`,
        choices: "NO_KEYS" //user cannot go past this trial
    }
    
    timeline.push(completion_page);

    jsPsych.run(timeline);

    return (<></>);
}

/*
a = input1;
b = input2;
if(a || b || 1/0 == 0){
    return true;
}
else{
    return false;
}
*/