'use client';

import { useVideoCreationStore } from '@/stores/video-creation-store';
import { MakeVideoContents } from './make-video-contents';

export function StoreSelection() {
  const { setCurrentStore } = useVideoCreationStore();

  // 기존 MakeVideoContents 컴포넌트를 재사용하되,
  // 가게 선택 시 새로운 플로우로 진입하도록 수정
  return (
    <div className="w-full h-full">
      <MakeVideoContents
        onStoreSelect={(store) => {
          // 가게 선택 시 영상 제작 상태로 설정
          setCurrentStore(store);
        }}
      />
    </div>
  );
}