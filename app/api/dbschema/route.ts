import { db } from "@/lib/db/db";
import { Connection, RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
interface TableField {
  Field?: string;
  Type?: string;
  Null?: string;
  Key?: string;
  Default?: string;
  Extra?: string;
}
interface Table {
  Name?: string;
  fields?: TableField[];
}
/*
   Field: 'idClerk',
    Type: 'varchar(100)',
    Null: 'YES',
    Key: '',
    Default: null,
    Extra: ''
    */
async function gettable(Tables: Table[]) {
  const conn = await db.getConnection();
  Tables.map(async (t) => {
    const [results, f] = await conn.query("DESCRIBE " + t.Name);
    //console.log(r);
    t.fields = results as [TableField];
    console.log("... : ", t);
  });
  return Tables;
}

export async function GET(request: NextRequest) {
  const Tables: Table[] = [];
  const names: string[] = [];
  const conn = await db.getConnection();
  const [results, f] = await conn.query("SHOW TABLES FROM mmbisdev", []);

  Object.values(results).map((t1) =>
    Object.values(t1).map((t2) => names.push(t2 as string)),
  );
  const mapPromises = names.map(async (e) => {
    const [res, f] = await conn.query("DESCRIBE " + e);
    const item: Table = { Name: e, fields: [] };
    Object.values(res).map((r) => item.fields?.push(r));

    Tables.push(item);
  });
  await Promise.allSettled(mapPromises);
  console.log("tables ........ ", Tables);
  return NextResponse.json(Tables ? Tables : "notfound", { status: 200 });
}
