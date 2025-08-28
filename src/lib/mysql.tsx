import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

type props = {
  sql: string;
  values: [];
};

export async function getConn() {
  return await mysql.createConnection(`${process.env.MYSQL_DATABASE_URL}`);
}

export async function runquery(sql: string, values: []) {
  try {
    const conn = await getConn();
    const [results, fields] = await conn.execute(sql, values);
    conn.end();
    return NextResponse.json({ fields: fields.map((f) => f.name), results });
  } catch (err) {
    // console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,
      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
