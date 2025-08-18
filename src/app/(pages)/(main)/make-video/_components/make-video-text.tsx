'use client';

import { useMakeVideoQuery } from '@/hooks/use-make-video-query';

export function MakeVideoText() {
  const { makeVideoInput } = useMakeVideoQuery();

  if (makeVideoInput) {
    return null;
  }

  return (
    <h2 className='pt-6 pl-6 text-displayLarge text-gray600'>
      영상을 제작할
      <br />
      가게를 선택해주세요
    </h2>
  );
}
