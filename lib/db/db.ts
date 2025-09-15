import mysql from "mysql2/promise";

export interface TableFieldData {
  Field?: string;
  Type?: string;
  Null?: string;
  Key?: string;
  Default?: string;
  Extra?: string;
}
export interface TableData {
  Name?: string;
  fields?: TableFieldData[];
}
export const db = mysql.createPool(`${process.env.MYSQL_DATABASE_URL}`);

export async function Query(sql: string, values: string[]) {
  const conn = await db.getConnection();
  try {
    const [results, fields] = await conn.query(sql, values);
    conn.release();
    return results;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  } finally {
    conn.release();
  }
}

export async function ExecQuery(sql: string, values: string[]) {
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
  const conn = await db.getConnection();
  try {
    const [results, fields] = await conn.execute(sql, values);
    conn.release();

    return fields;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  } finally {
    conn.release();
  }
}
