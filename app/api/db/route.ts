import { ExecQuery, Query } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const dataStr = request.headers.get("data");

  if (dataStr) {
    const data = JSON.parse(dataStr);
    const Params = data.Params.map((e: unknown) =>
      typeof e === "string" ? decodeURIComponent(e) : e,
    );
    //console.log(data.Sql, Params);
    const response = await Query(data.Sql, Params);

    return NextResponse.json(response, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const dataStr = request.headers.get("data");

  if (dataStr) {
    const data = JSON.parse(dataStr);
    const Params = data.Params.map((e: unknown) => (e == "null" ? null : e));
    const response = await ExecQuery(data.Sql, Params);
    return NextResponse.json(response, { status: 200 });
  }
}
