// hooks/useDirectS3Upload.ts
import { useMutation } from '@tanstack/react-query';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, BUCKET_NAME } from '@/lib/utils/s3-client';

interface UseDirectS3UploadOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: Error) => void;
}

export function useDirectS3Upload(options?: UseDirectS3UploadOptions) {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      // 고유한 파일명 생성
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const key = `uploads/${timestamp}-${randomString}.${fileExtension}`;

      try {
        // S3에 직접 업로드
        const command = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: file,
          ContentType: file.type,
          // 퍼블릭 읽기 권한 설정 (선택사항)
          ACL: 'public-read',
        });

        await s3Client.send(command);

        // 업로드 성공 시 public URL 생성
        const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;

        return publicUrl;
      } catch (error) {
        console.error('S3 업로드 에러:', error);
        throw new Error('파일 업로드에 실패했습니다.');
      }
    },
    onSuccess: imageUrl => {
      options?.onSuccess?.(imageUrl);
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
}
