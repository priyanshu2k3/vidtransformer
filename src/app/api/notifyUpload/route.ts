import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Request :: Body :: ", body);
  } catch (error) {
    console.error("Error ", error);
  }
  return NextResponse.json({
    msg: "hey from the post route hello server is working fine ",
  });
}
