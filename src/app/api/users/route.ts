import { runquery } from "@/lib/mysql";

export async function GET() {
  return await runquery("SELECT * FROM users", []);
}
