'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as any;

const videoSrc = 'https://www.youtube.com/watch?v=J7fJqDK9flg';

export function VideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className='relative min-w-[130px] h-auto flex flex-col items-start gap-2 aspect-[121/215] rounded-[10px] overflow-hidden cursor-pointer'>
      <Suspense fallback={null}>
        <ReactPlayer
          url={videoSrc}
          width='100%'
          height='100%'
          controls
          muted
          playing={true}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          loop
        />
      </Suspense>
    </div>
  );
}
