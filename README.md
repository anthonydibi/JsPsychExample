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

To use JsPsych, it must be installed using `npm` and then imported. We can then initialize the JsPsych environment:
```js
const jsPsych: JsPsych = initJsPsych({ on_finish: function(): void {
    jsPsych.data.displayData();
}});
```

here, `on_finish` is a function that will be run when the survey is over. In this case, we display the data for testing.

The main concept to understand with JsPsych is that JsPsych experiments are run from a timeline. The timeline is a list:
```js
const timeline: Array<object> = [];
```

and then stimuli can be appended to this list, and when the experiment is run, they will be displayed to the user in order:

```js
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
```

here, `welcome` and `instructions` are two stimuli. There are a few ways to represent a stimulus, but in this case we provide `type`, which describes what is shown by that stimulus and how a response is collected - for example, `jsPsychHtmlButtonResponse` is the default export of `@jspsych/plugin-html-button-response`, which provides a built-in solution for showing HTML to the user and then collecting a response by using buttons. `stimulus` is the HTML shown to the user, and `choices` corresponds to what buttons will be displayed for the user to choose from.

Then, we tell JsPsych to run the timeline:

```js
jsPsych.run(timeline);
```

and then JsPsych starts showing the user all of the stimuli in the timeline.

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

The lambda function uses the AWS SDK to retrieve image links from the bucket. The actual image data is not sent from the lambda, it just sends the urls so that the images can be loaded as needed on the client side:

```js
const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' });


exports.handler = async (event, context) => {
    const task = event["queryStringParameters"]["task"];
    const objectUrls = [];
    var params = {
      Bucket: 'ibeltimages',
      Prefix: task
    };
    let s3Objects;
    try {
       s3Objects = await s3.listObjectsV2(params).promise();
    } catch (e) {
       return e;
    }
    s3Objects.Contents.map((obj) => {
        objectUrls.push(`https://ibeltimages.s3.amazonaws.com/${obj.Key}`)
    })
    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        headers: {
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Credentials": true,
        },
        "body": JSON.stringify(objectUrls),
    };
};
```
This lambda function takes in a query string parameter `task`, which must correspond to a folder name in the S3 bucket. It then retrieves all objects from that folder, and gets their object URLs. These URLs are returned in the response body to be used in the survey.

then `imageUrls` will contain all of the image URLs under that folder.
