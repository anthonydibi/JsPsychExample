import { initJsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';

export default function Experiment() {
    const jsPsych = initJsPsych({ on_finish: function() {
        jsPsych.data.displayData();
    }});
    
    //holds each phase of the experiment in order - welcome, instructions, trial, etc..
    const timeline = [];

    //put the different face images to test here
    const trial_faces = [
        { stimulus: '<img src="https://gitlab.linghai.me/nxdens/task-images/-/raw/main/CFD-AF-200-228-N.jpg?inline=false" alt="Person making a face" width="400" height="400">'},
        { stimulus: '<img src="https://gitlab.linghai.me/nxdens/task-images/-/raw/main/CFD-AF-252-135-N.jpg?inline=false" alt="Person making a face" width="400" height="400">'}
    ];

    //type is the interaction plugin to use - we are using the html keyboard response here which means the stimulus is HTML
    //and the response is a keyboard input. We don't provide input choices here since the user can press any key to begin
    const welcome = {
        type: jsPsychHtmlButtonResponse,
        stimulus: 'Welcome to the experiment. Press "continue" to advance.',
        choices: ['Continue'],
    }
    timeline.push(welcome);

    const instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: 'You have three choices for rating each face: positive, indicating that the person seems happy, pleased, or delighted; neutral, indicating a lack of positive or negative emotional expression; or negative, indicating that the person seems sad, afraid, angry, or disgusted. You will see faces only for a brief moment, so please respond as fast as possible. Select the most accurate description for the emotional expression on each face. If the face contains a positive emotional expression, press the "positive" button. If the face contains a neutral emotional expression, press the "neutral" button. If the face contains a negative emotional expression, press the "negative" button. Press "continue" to advance.',
        choices: ['Continue'],
    }
    timeline.push(instructions);

    const trial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: jsPsych.timelineVariable("stimulus"),
        choices: ['Positive', 'Neutral', 'Negative']
    }

    //a procedure uses a timeline variable to show a repeated series of trials. It runs the timeline once for each element in the timeline
    //variable - in this case the timeline variable is trial_faces so it will run twice if it contains two stimuli
    const test_procedure = {
        timeline: [trial],
        timeline_variables: trial_faces
    };
    timeline.push(test_procedure);

    jsPsych.run(timeline);

    return;
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