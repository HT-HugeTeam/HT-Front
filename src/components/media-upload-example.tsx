// components/media-upload-example.tsx
'use client';

import { MediaUpload } from './media-upload';
import { useState } from 'react';

export function MediaUploadExample() {
  const [uploadedFiles, setUploadedFiles] = useState<{
    url: string;
    type: 'image' | 'video';
  }[]>([]);

  const handleUploadComplete = (url: string, fileType: 'image' | 'video', backendResponse?: any) => {
    setUploadedFiles(prev => [...prev, { url, type: fileType }]);
    
    if (backendResponse) {
      console.log('Backend response:', backendResponse);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">미디어 업로드 예제</h2>
      
      {/* 이미지만 업로드 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">이미지만 업로드</h3>
        <MediaUpload
          allowedTypes={['image']}
          maxSize={10 * 1024 * 1024} // 10MB
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* 동영상만 업로드 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">동영상만 업로드</h3>
        <MediaUpload
          allowedTypes={['video']}
          maxSize={100 * 1024 * 1024} // 100MB
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* 이미지 + 동영상 업로드 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">이미지 + 동영상 업로드</h3>
        <MediaUpload
          allowedTypes={['image', 'video']}
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* 커스텀 업로드 버튼 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">커스텀 버튼</h3>
        <MediaUpload onUploadComplete={handleUploadComplete}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            파일 선택
          </button>
        </MediaUpload>
      </div>

      {/* 백엔드 통합 예제 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">백엔드 통합 업로드</h3>
        <MediaUpload
          allowedTypes={['image', 'video']}
          submitToBackend={true}
          backendOptions={{
            endpoint: '/api/files',
            category: 'user-uploads',
            description: '사용자가 업로드한 미디어 파일',
            tags: ['user-content', 'media'],
            headers: {
              'Authorization': 'Bearer your-token-here',
            },
          }}
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* 업로드된 파일 목록 */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">업로드된 파일</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="border rounded-lg p-2">
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <video
                    src={file.url}
                    className="w-full h-32 object-cover rounded"
                    controls
                    muted
                  />
                )}
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {file.url}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}