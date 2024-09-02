import { inngest } from "./client";
import { sendEmail } from "@/lib/email"

export const handleNewUser = inngest.createFunction(
  { id: "handle-new-user" },
  { event: "db/user.created" },
  async ({ event, step }) => {
    // This object includes the entire record that changed
    const pulseEvent = event.data;

    await step.run("send-welcome-email", async () => {
  		// Send welcome email
      await sendEmail({
        template: "welcome",
        to: pulseEvent.created.email,
      });
    });

    await step.sleep("wait-before-tips", "3d");

    await step.run("send-new-user-tips-email", async () => {
      // Follow up with some helpful tips
      await sendEmail({
        template: "new-user-tips",
        to: pulseEvent.created.email,
      });
    });
  },
);