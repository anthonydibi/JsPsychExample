import { initJsPsych, JsPsych } from "jspsych";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'
import { Pretask } from "./Pretask";
import { MainTask } from "./MainTask";
import React from "react";

export default function Experiment() {
    const init = async () => { //run all of the JsPsych initialization logic
        const jsPsych: JsPsych = initJsPsych({ on_finish: function(): void {
            jsPsych.data.displayData();
        }});

        let record = {"record_id": 21231231, "intro_doc": "2", "intro_first": "James", "intro_last": "Moorehead", "intro_initials": "J_Moo", "intro_email": "jamesdmoorehead@gmail.com", "intro_send": "1", "gpn_intro_consent_complete": "2", "consent_age": "65", "consent6": "James D Moorehead", "consent7": "1956-01-09", "consent8": "1", "consent9": "Yes", "consent_date": "2020-07-29", "gpn_consent_complete": "2", "sig_agree": "0", "sig_consent": "James Moorehead, BS", "sig_signature": "signature_2020-07-29_1049.png", "sig_time": "2020-07-29 10:48", "gpn_signature_complete": "2"};
    
        let requestBody = {
            token: "14985E6EAEB3A378CF4DBA82685B4017",
            format: "json",
            content: "record",
            type: "flat",
            action: "import",
            overwriteBehavior: "normal",
            forceAutoNumber: "true",
            data: JSON.stringify(record)
        }
        const res = await fetch("https://www.ctsiredcap.pitt.edu/redcap/api/", {
            method: "post",
            body: requestBody,
        });

        
        console.log(res);
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
        await pretask.setupAndPushToTimeline(jsPsych, timeline);
    
        let mainTask = new MainTask();
        await mainTask.setupTrialsAndPushToTimeline(jsPsych, timeline);
    
        const completion_page = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p>That concludes the study. Click the following link to complete.</p>
                <p><a href="https://app.prolific.co/submissions/complete?cc=C1MBJ904">Click here to return to Prolific and complete the study</a>.</p>`,
            choices: "a" //user cannot go past this trial
        }
        
        timeline.push(completion_page);
    
        jsPsych.run(timeline);
    }

    React.useEffect(() => { //this tells React to only run the code inside ONCE when this component is first "mounted", e.g. the first time it is loaded - more details here: https://legacy.reactjs.org/docs/hooks-effect.html
        init();
    }, [])

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