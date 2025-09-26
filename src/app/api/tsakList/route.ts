import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const req = request.headers.get("Authorization");

  const 

  console.log(req);
  console.log("ended");

  return NextResponse.json({
    msg: "hey from the get route hello server is working fine from ",
    body: req,
  });
}

