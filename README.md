# UPMC Survey Task

## Introduction
This is a survey task built using JsPsych. It is bootstrapped using `create-react-app`, although it would function identically without being built in React - I had just bootstrapped
it that way in case I needed to build an interface for the survey. However, JsPsych handles all of the user input and UI.

## Project Structure

Most files in interest are found in `src`. `App.tsx` is the root of the app, and renders the `Experiment` component (although, this component does not actually *render* anything itself, it just calls JsPsych to render things). Experiment is where the timeline for the experiment is built. Also, an attempt is made to post a record to the REDCap API. Logic for the different sections of the experiment live in different files - for example, `Pretask.ts` holds the logic for generating the pretask stimuli.

## Running locally
Prerequisites
- [Install `git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install `npm` and `nodejs`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 
To run this project, clone the repository using `git clone <url>`, where `<url>` is this repo's url. Then, run `npm install` in the project directory to install dependencies, and then `npm run start` to run a server for the survey on `localhost`. `npm` should automatically open the locally hosted survey in your browser.

## JsPsych
[JsPsych](https://www.jspsych.org/7.3/) is a behavior experiment building framework for the browser. It provides an interface for displaying stimuli to users and collecting their reactions to those stimuli. Their documentation is great, so anything you want to learn about it can be found at the above link.

## Styling
If you want to change the appearance of the JsPsych HTML elements, it is quite easy to do so. You can follow the instructions [here](https://www.jspsych.org/7.0/overview/style/) - simply add new CSS rules to `jspsych.css`. For example, to change the appearance of a JsPsych button, you could add a rule like this to `jspsych.css`: 
```css
.jspsych-btn {
  background-color: blue;
}
```
The JsPsych documentation also gives good advice on how to use developer tools to find class names for JsPsych elements you want to apply styles to:
![image](https://user-images.githubusercontent.com/57297382/236931387-a341870f-8bea-48e7-8720-fbc45deca38c.png)

