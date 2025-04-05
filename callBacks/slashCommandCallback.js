// Exporting an async function named `callbackfn` that takes an object with Slack parameters
export const callbackfn = async ({ command, ack, body, client }) => {
  // Acknowledge the command request from Slack
  await ack();
  console.log("Command received");

  try {
    // Try to open a modal window using Slack's client API
    await client.views.open({
      // The trigger ID is required to open the modal
      trigger_id: body.trigger_id,

      // view object defines structure of modal
      view: {
        type: "modal", // This defines the view as a modal
        callback_id: "approval_request", // This ID will be used to handle submission

        // Title of modal window
        title: {
          type: "plain_text",
          text: "Approval Request",
        },

        // Submit button text
        submit: {
          type: "plain_text",
          text: "Submit",
        },

        // Blocks r UI components inside modal
        blocks: [
          {
            // First block: a user selector input
            type: "input",
            block_id: "approver_select", // Unique ID for this block
            label: {
              type: "plain_text",
              text: "Select Approver", // Label for the input
            },
            element: {
              type: "users_select", // Slack element for selecting a user
              placeholder: {
                type: "plain_text",
                text: "Select a user", // Placeholder text in the dropdown
              },
              action_id: "selected_approver", // Action ID to identify user selection
            },
          },
          {
            // Second block: a plain text input for approval text
            type: "input",
            block_id: "approval_text", // Unique ID for this block
            label: {
              type: "plain_text",
              text: "Enter approval text", // Label for the text area
            },
            element: {
              type: "plain_text_input", // Input type: plain text
              multiline: true, // Allows multi-line input
              action_id: "approval_text", // Action ID to identify text input
            },
          },
        ],
      },
    });
  } catch (error) {
    // Catch and log any error that occurs during modal opening
    console.error(error);
  }
};
