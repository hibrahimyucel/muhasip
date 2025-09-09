import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

type props = {
  sql: string;
  values: [];
};

export async function getConn() {
  return await mysql.createConnection(`${process.env.MYSQL_DATABASE_URL}`);
}

export async function runquery(sql: string, values: string[]) {
  try {
    const conn = await getConn();
    const [results, fields] = await conn.execute(sql, values);
    conn.end();
    return NextResponse.json({ fields: fields.map((f) => f.name), results });
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);
    console.log(err);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
export async function execquery(sql: string, values: string[]) {
  /** 
  ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 12,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
} */
  try {
    const conn = await getConn();
    const [results, fields] = await conn.execute(sql, values);
    conn.end();

    return NextResponse.json({ results });
  } catch (err) {
    console.log(err);
    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 200 });
  }
}
