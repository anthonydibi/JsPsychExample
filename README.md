# UPMC Survey Task

## Introduction
This is a survey task built using JsPsych. It is bootstrapped using `create-react-app`, although it would function identically without being built in React - I had just bootstrapped
it that way in case I needed to build an interface for the survey. However, JsPsych handles all of the user input and UI.

## Project Structure

Most files of interest are found in `src`. `App.tsx` is the root of the app, and renders the `Experiment` component (although, this component does not actually *render* anything itself, it just calls JsPsych to render things). Experiment is where the timeline for the experiment is built. Also, an attempt is made to post a record to the REDCap API. Logic for the different sections of the experiment live in different files - for example, `Pretask.ts` holds the logic for generating the pretask stimuli.

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

## Deployment
This survey has components deployed to various places. The front end for the survey is deployed to Netlify under my personal Github account - if you would like to deploy this to a UPMC account, it is quite easy as Netlify is very user-friendly - just follow the instructions [here](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/). Images for the survey are retrieved from an S3 bucket, under Linghai Wang's AWS account. The URLs are retrieved from a Lambda function that is exposed through an API gateway under this same account. This API relies on the images being kept in a folder related to their task - for example, pre-task images can be stored under a folder named `pre-task`, and URLs for these images can be fetched like so:
```js
const imageUrlResponse = await fetch("https://7qfbe3atn3.execute-api.us-east-1.amazonaws.com/default/get_pretask_images?task=pre-task",
    {method: "GET", mode: "cors"});
const imageUrls: Array<string> = await imageUrlResponse.json();
```
then `imageUrls` will contain all of the image URLs under that folder.
