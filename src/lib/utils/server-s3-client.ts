// lib/utils/server-s3-client.ts
import { S3Client } from '@aws-sdk/client-s3';

// 서버 전용 S3 클라이언트 (환경변수 보호)
export const serverS3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET_NAME = process.env.S3_BUCKET_NAME!;