export const approveOrRejectCallBack = async ({ action, ack, body, client }) => {
    await ack();
    console.log("Approve or reject callBack triggered");

    // Extracting Data
    //action.value contains some data that was stored when the button was created. Its a <JSON string>, so we parse it into a usable object.
    const { requester, approvalText, approver } = JSON.parse(action.value);
    const decision = action.action_id === "approve" ? "Approved" : "Rejected";

    //  Send Message to Requester
    await client.chat.postMessage({
      channel: requester,
      // text: `Your approval request has been ${decision} by <@${approver}>`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `=======\n*Approval Request from <@${requester}>*\n\n${approvalText}\n\n*Status:* ${decision} by <@${body.user.id}>\n========`,
          },
        },
      ],
    });
    // await client.chat.postMessage({
    //   channel: approver,
    //   text: `You have ${decision} the request from <@${requester}>`
  
    // });


  //Update Original Message
    await client.chat.update({
      channel: body.channel.id,
      ts: body.message.ts, // Use the stored timestamp to update the correct message
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            // <@${requester}> is Slack’s way of mentioning a user.
            //${approvalText} is the actual request text (e.g., “Can I take leave on Friday?” or “Approve budget for new laptops.”).
            //${decision} will be either "Approved" or "Rejected", depending on what the person clicked.
            //<@${body.user.id}> mentions the person who clicked the button to approve/reject.

            text: `=======\n*Approval Request from <@${requester}>*\n\n${approvalText}\n\n*Status:* ${decision} by <@${body.user.id}>\n========`,
          },
        },
      ],
      text: `Approval Request ${decision}`,
    });
  
  };


