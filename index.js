import {approveOrRejectCallBack} from "./callBacks/approveRejectRequest.js"
import {onApprovalRequest} from "./callBacks/handlingFormSubmission.js"
import {callbackfn} from "./callBacks/slashCommandCallback.js"

// Importing packages & loading environment variables
import { configDotenv } from "dotenv";
configDotenv();
import pkg from "@slack/bolt";
const { App } = pkg;

//Setting up the Slack App
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true, 
});

// Handling Form Submission (Modal Submit)
app.view("approval_request", onApprovalRequest);

//  Listening for Actions and Commands
// app.action(["approve", "reject"], approveOrRejectCallBack);
app.action("approve", approveOrRejectCallBack);
app.action("reject", approveOrRejectCallBack);

// Handling Slash Command /approval-test
app.command("/approval-test", callbackfn);


// Starting Slack App
const start = async () => {
  await app.start();
  console.log("Approval bot is running");
};
start();
