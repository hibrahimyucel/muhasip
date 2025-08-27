import { NextRequest } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: NextRequest) {
  {
    try {
      const dbconnection = await mysql.createConnection(
        `${process.env.MYSQL_DATABASE_URL}`
      );

      const [results, fields] = await dbconnection.execute(
        "SELECT * FROM users",
        []
      );

      dbconnection.end;
      return new Response(
        JSON.stringify({ fields: fields.map((f) => f.name), results }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      console.log("ERROR: API - ", (err as Error).message);
      const response = {
        error: (err as Error).message,
        returnedStatus: 200,
      };
    }
  }
}
