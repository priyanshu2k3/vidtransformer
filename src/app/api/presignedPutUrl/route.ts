import { NextRequest, NextResponse } from "next/server";
import { handleS3presignedUrlCreation } from "../helperFunctions/presignedUrl";
const prisma = (await import("../helperFunctions/prisma/prisma")).default;

export async function GET(request: NextRequest) {
  const data = await handleS3presignedUrlCreation();
  if (!data) {
    return NextResponse.json({ msg: "error creating presigned url" });
  }
  const newJobs = await prisma.jobs.create({
    data: {
      fileName: data.fileName,
      objectKey: 1,
      status: "PENDING",
    },
  });
  if (!newJobs) {
    return NextResponse.json({ msg: "error creating job in db" });
  }
  return NextResponse.json({
    msg: "hey from the  put route hello server is working fine ",
    presignedUrl: data.url,
    fileName: data.fileName,
  });
}
