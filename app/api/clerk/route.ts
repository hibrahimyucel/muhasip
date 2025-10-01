import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { usersData } from "@/lib/orm/table-data";
import { ExecQuery } from "@/lib/db/db";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const results = await ExecQuery(
        `select * from users where idClerk like ?`,
        [evt.data.id],
      );

      const users = results as usersData[];

      if (users.length > 0)
        await ExecQuery(
          `update users set email = ?, fullname = ? where idClerk = ?`,
          [
            evt.data.email_addresses[0].email_address,
            evt.data.first_name + " " + evt.data.last_name,
            users[0].idClerk,
          ],
        );
      else
        await ExecQuery(
          `insert into users (email, fullname, idClerk) values( ?, ?, ? )`,
          [
            evt.data.email_addresses[0].email_address,
            evt.data.first_name + " " + evt.data.last_name,
            evt.data.id,
          ],
        );
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
