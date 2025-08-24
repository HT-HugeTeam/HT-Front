'use client';

import { toast } from 'sonner';

export function VideoCheckButton({ videoUrl }: { videoUrl: string }) {
  // 갤러리에 저장 (다운로드) 기능
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shorts-table-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('영상이 다운로드되었습니다!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 업로드 요청 (이메일 발송) 기능
  const handleUploadRequest = async () => {
    toast.success('업로드 요청이 완료되었습니다!');
  };

  return (
    <div className='w-full h-auto flex items-center gap-2'>
      <button
        onClick={handleDownload}
        className='flex-1 w-full px-5 py-2 h-14 text-bodySmall rounded-[15px] bg-gray200 text-gray600 hover:bg-gray300 transition-colors'
      >
        갤러리에 저장
      </button>
      <button
        onClick={handleUploadRequest}
        className='flex-1 w-full px-5 py-2 h-14 text-bodySmall rounded-[15px] bg-orange400 text-white000 hover:bg-orange500 transition-colors'
      >
        업로드 요청
      </button>
    </div>
  );
}
