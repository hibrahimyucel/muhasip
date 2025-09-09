import { NextRequest, NextResponse } from "next/server";
import { runquery, execquery } from "@/lib/mysql";

export async function GET(request: NextRequest) {
  const dataStr = request.headers.get("data");
  let sql = "SELECT * FROM customers where (1=1) ";
  const p: string[] = [];

  if (dataStr) {
    const data = JSON.parse(dataStr);
    sql =
      sql +
      (data.name ? " and name like ? " : " ") +
      (data.city ? " and city like ? " : " ");

    if (data.name) p.push(data.name);
    if (data.city) p.push(data.city);
  }

  return await runquery(sql, p);
}

export async function POST(request: NextRequest) {
  const dataStr = request.headers.get("data");
  if (dataStr) {
    const data = JSON.parse(dataStr);
    if (data.idcustomers) {
      const sql =
        "UPDATE customers SET name = ?, adress = ?, city = ?, phone = ? WHERE idcustomers = ?";

      const p: string[] = [
        decodeURIComponent(data.name),
        decodeURIComponent(data.adress),
        decodeURIComponent(data.city),
        decodeURIComponent(data.phone),
        data.idcustomers,
      ];
      return await execquery(sql, p);
    } else {
      const sql =
        "INSERT INTO customers (name,adress,city,phone) VALUES ( ?,?,?,?)";

      const p: string[] = [
        decodeURIComponent(data.name),
        decodeURIComponent(data.adress),
        decodeURIComponent(data.city),
        decodeURIComponent(data.phone),
      ];
      return await execquery(sql, p);
    }
  }
  const response = {
    error: "No data provided",
    returnedStatus: 500,
  };

  return NextResponse.json(response, { status: 200 });
}
