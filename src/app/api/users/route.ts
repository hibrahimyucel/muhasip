import { NextRequest } from "next/server";
import { runquery } from "@/lib/mysql";

export async function GET(request: NextRequest) {
  return await runquery("SELECT * FROM users", []);
}
