import { JsPsych } from "jspsych";

export interface SurveyBlock{
    setupAndPushToTimeline(jsPsych: JsPsych, timeline: Array<object>, index: number): void
}