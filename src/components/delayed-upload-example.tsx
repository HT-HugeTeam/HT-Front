// components/delayed-upload-example.tsx
'use client';

import { FilePreview } from './file-preview';
import { useManualUpload } from '@/hooks/use-manual-upload';
import { useState } from 'react';
import { toast } from 'sonner';

export function DelayedUploadExample() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const {
    uploadFiles,
    uploadProgress,
    isUploading,
    resetProgress,
  } = useManualUpload({
    onAllComplete: (results) => {
      const urls = results.map(result => result.url);
      setUploadedUrls(prev => [...prev, ...urls]);
      toast.success(`${results.length}개 파일 업로드 완료!`);
      setSelectedFiles([]); // 선택된 파일 초기화
      resetProgress();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onProgress: (progress) => {
      console.log('Upload progress:', progress);
    },
  });

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error('업로드할 파일을 선택해주세요.');
      return;
    }
    uploadFiles(selectedFiles);
  };

  const clearUploadedFiles = () => {
    setUploadedUrls([]);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold">지연 업로드 예제</h2>
      
      {/* 파일 선택 영역 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">1. 파일 선택</h3>
        <FilePreview
          onFileSelect={handleFileSelect}
          allowedTypes={['image', 'video']}
          maxFiles={5}
          maxSize={20 * 1024 * 1024} // 20MB
        />
      </div>

      {/* 업로드 버튼 영역 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">2. 업로드 실행</h3>
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isUploading ? '업로드 중...' : `업로드 (${selectedFiles.length}개)`}
          </button>
          
          <button
            onClick={() => setSelectedFiles([])}
            disabled={selectedFiles.length === 0 || isUploading}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            선택 취소
          </button>
        </div>
      </div>

      {/* 업로드 진행상태 */}
      {uploadProgress.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">업로드 진행상태</h3>
          <div className="space-y-2">
            {uploadProgress.map((progress, index) => (
              <div key={index} className="border rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium truncate">{progress.fileName}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    progress.status === 'completed' ? 'bg-green-100 text-green-800' :
                    progress.status === 'error' ? 'bg-red-100 text-red-800' :
                    progress.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {progress.status === 'completed' ? '완료' :
                     progress.status === 'error' ? '실패' :
                     progress.status === 'uploading' ? '업로드 중' : '대기'}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress.status === 'completed' ? 'bg-green-500' :
                      progress.status === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
                
                {progress.error && (
                  <p className="text-xs text-red-600 mt-1">{progress.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 업로드 완료된 파일들 */}
      {uploadedUrls.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">업로드 완료된 파일 ({uploadedUrls.length}개)</h3>
            <button
              onClick={clearUploadedFiles}
              className="text-sm text-red-600 hover:text-red-800"
            >
              모두 삭제
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="border rounded-lg p-2">
                {url.includes('images') ? (
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <video
                    src={url}
                    className="w-full h-32 object-cover rounded"
                    controls
                    muted
                  />
                )}
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {url.split('/').pop()}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(url)}
                  className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                >
                  URL 복사
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}