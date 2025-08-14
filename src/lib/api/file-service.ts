// lib/api/file-service.ts
interface FileSubmissionData {
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  // 추가 메타데이터가 필요한 경우
  category?: string;
  description?: string;
  tags?: string[];
}

interface BackendResponse {
  success: boolean;
  message: string;
  fileId?: string;
  data?: any;
}

export class FileService {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  /**
   * 업로드된 파일 정보를 백엔드에 전송
   */
  static async submitFileToBackend(
    fileData: FileSubmissionData,
    options?: {
      endpoint?: string;
      headers?: Record<string, string>;
    }
  ): Promise<BackendResponse> {
    const endpoint = options?.endpoint || '/api/files';
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: JSON.stringify({
          ...fileData,
          uploadedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Backend submission error:', error);
      throw new Error('백엔드 전송에 실패했습니다.');
    }
  }

  /**
   * 파일 삭제 요청 (S3에서 삭제 + 백엔드 DB에서 제거)
   */
  static async deleteFile(
    fileId: string,
    options?: {
      endpoint?: string;
      headers?: Record<string, string>;
    }
  ): Promise<BackendResponse> {
    const endpoint = options?.endpoint || '/api/files';
    const url = `${this.baseURL}${endpoint}/${fileId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('File deletion error:', error);
      throw new Error('파일 삭제에 실패했습니다.');
    }
  }

  /**
   * 파일 목록 조회
   */
  static async getFiles(
    params?: {
      category?: string;
      limit?: number;
      offset?: number;
    },
    options?: {
      endpoint?: string;
      headers?: Record<string, string>;
    }
  ): Promise<BackendResponse> {
    const endpoint = options?.endpoint || '/api/files';
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const url = `${this.baseURL}${endpoint}?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('File fetch error:', error);
      throw new Error('파일 목록 조회에 실패했습니다.');
    }
  }
}