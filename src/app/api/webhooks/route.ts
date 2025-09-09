import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { insertUser } from "@/lib/dbusers";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      insertUser(
        evt.data.first_name + " " + evt.data.last_name,
        evt.data.email_addresses[0].email_address,
        evt.data.id,
      );
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    return new Response("Error verifying webhook", { status: 400 });
  }
}
