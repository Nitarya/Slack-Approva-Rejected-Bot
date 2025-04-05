export const onApprovalRequest = async ({ view, ack, body, client }) => {
    await ack();
    console.log("Approval request received");
    // Extract data from the modal submission
    const approver =
      view.state.values.approver_select.selected_approver.selected_user;
    const approvalText = view.state.values.approval_text.approval_text.value;
    const requester = body.user.id;
  
    //Send approval request to Approver
    await client.chat.postMessage({
      channel: approver,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New Approval Request from <@${requester}>*\n\n${approvalText}`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Approve",
              },
              style: "primary",
              action_id: "approve",
              value: JSON.stringify({ requester, approvalText, approver }),
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Reject",
              },
              style: "danger",
              action_id: "reject",
              value: JSON.stringify({ requester, approvalText, approver }),
            },
          ],
        },
      ],
      text: "New Approval Request",
    });
  };