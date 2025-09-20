import { ExecQuery, Query } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const dataStr = request.headers.get("data");

  if (dataStr) {
    const data = JSON.parse(dataStr);
    const Params = data.Params.map((e: any) => decodeURIComponent(e));

    //console.log(Params);

    const response = await Query(data.Sql, Params);

    return NextResponse.json(response, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const dataStr = request.headers.get("data");

  if (dataStr) {
    const data = JSON.parse(dataStr);
    const response = await ExecQuery(data.Sql, data.Params);
    return NextResponse.json(response, { status: 200 });
  }
}
