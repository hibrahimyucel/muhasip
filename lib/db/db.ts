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

export async function Query(sql: string, values: unknown[]) {
  const conn = await db.getConnection();
  try {
    const [results] = await conn.query(sql, values);
    conn.release();
    return results;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  } finally {
    conn.release();
  }
}

export async function ExecQuery(sql: string, values: unknown[]) {
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
    const [results] = await conn.execute(sql, values);
    conn.release();

    return results;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  } finally {
    conn.release();
  }
}
