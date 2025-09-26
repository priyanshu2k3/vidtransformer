import { NextRequest, NextResponse } from "next/server";

const prisma = (await import("../helperFunctions/prisma/prisma")).default;

export async function GET(request: NextRequest) {
  //   const req = request.headers.get("Authorization");
  console.log("Request received to fetch pending jobs");
  const response = await prisma.jobs.findMany({
    where: { status: { in: ["PENDING", "ERROR"] } },
  });
  return NextResponse.json({
    msg: "hey from the get route hello server is working fine from ",
    body: response,
  });
}
