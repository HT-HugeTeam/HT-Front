export function GradientProgressBar({ progress }: { progress: number }) {
  return (
    <div className='w-full h-4 bg-gray100 rounded-[4px] overflow-hidden'>
      <div
        className='h-full transition-all duration-1000 ease-out relative'
        style={{
          width: `${progress}%`,
          background:
            'linear-gradient(90deg, #ffd9d2 0%, #ff8a65 50%, #ff3f0f 100%)',
          boxShadow: progress > 0 ? '0 0 8px rgba(255, 63, 15, 0.4)' : 'none',
        }}
      >
        {/* 움직이는 광택 효과 */}
        <div
          className='absolute inset-0 opacity-30'
          style={{
            background:
              'linear-gradient(90deg, transparent 0%,rgba(255,255,255,0.8) 50%, transparent 100%)',

            animation:
              progress > 0 && progress < 100 ? 'shimmer 2s infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}
