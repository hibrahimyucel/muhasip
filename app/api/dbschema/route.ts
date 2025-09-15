import { db, TableData } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const conn = await db.getConnection();
  const [results, f] = await conn.query("SHOW TABLES FROM mmbisdev", []);

  const names: string[] = [];
  Object.values(results).map((t1) =>
    Object.values(t1).map((t2) => names.push(t2 as string)),
  );

  const Tables: TableData[] = [];

  const mapPromises = names.map(async (e) => {
    const [res, f] = await conn.query("DESCRIBE " + e);

    const item: TableData = { Name: e, fields: [] };
    Object.values(res).map((r) => item.fields?.push(r));

    Tables.push(item);
  });

  await Promise.allSettled(mapPromises);
  conn.release();
  return NextResponse.json(Tables, { status: 200 });
}
