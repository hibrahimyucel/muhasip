import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { insertUser } from "@/lib/dbusers";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    // console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created") {
      console.log("userId:", evt.data);
      !evt.data.has_image ? evt.data.image_url : null;
      insertUser(
        evt.data.first_name + " " + evt.data.last_name,
        evt.data.email_addresses[0].email_address,
        evt.data.id,
        evt.data.image_url
      );
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
