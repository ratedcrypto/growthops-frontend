import AWS from "aws-sdk";

const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET || "growthops";
const REGION = process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION || "ap-southeast-2";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const S3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export { S3, REGION, S3_BUCKET };
