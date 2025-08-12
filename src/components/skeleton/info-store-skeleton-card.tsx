export function InfoStoreSkeletonCard() {
  return (
    <div className='p-6 w-full h-auto flex flex-col gap-6 rounded-[15px] border border-gray100 bg-white shadow-[0_4px_10px_0_rgba(154,159,160,0.15)]'>
      {/* 스켈레톤 제목 */}
      <div className='h-6 bg-gray-200 rounded animate-pulse w-3/4'></div>

      {/* 스켈레톤 콘텐츠 */}
      <div className='flex flex-col gap-4'>
        {/* 주소 */}
        <div className='flex flex-col gap-1'>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-12'></div>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-full'></div>
        </div>

        {/* 소개 */}
        <div className='flex flex-col gap-1'>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-12'></div>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-5/6'></div>
        </div>

        {/* 메뉴 */}
        <div className='flex flex-col gap-1'>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-12'></div>
          <div className='h-4 bg-gray-200 rounded animate-pulse w-2/3'></div>
        </div>
      </div>
    </div>
  );
}
