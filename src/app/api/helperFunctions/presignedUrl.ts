import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;
const bucketName = process.env.BUCKET_NAME;

export const handleS3presignedUrlCreation = async () => {
  try {
    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
      throw new Error("Missing AWS credentials in environment variables");
    }

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    const fileName = `videos/${Date.now()}.mp4`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: "video/mp4", // specify content type if needed
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // expires in seconds
    return { url, fileName }; // this is your single presigned URL for PUT upload
  } catch (error) {
    console.error("Error creating presigned URL:", error);
    return null;
  }
};
