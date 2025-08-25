// lib/utils/server-s3-client.ts
import { S3Client } from '@aws-sdk/client-s3';

// 서버 전용 S3 클라이언트 (환경변수 보호)
export const serverS3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
