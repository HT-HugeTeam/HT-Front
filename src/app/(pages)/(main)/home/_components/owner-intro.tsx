const OWNER_NICKNAME = '윤멋사';
const HITS_COUNT_PERCENT = 12;

export function OwnerIntro() {
  return (
    <header className='w-full h-auto flex flex-col items-start gap-2'>
      <div className='flex flex-col gap-1'>
        <h2 className='flex gap-1 items-end text-gray600'>
          <span className='text-displayLarge'>{OWNER_NICKNAME}</span>
          <span className='text-displayMedium'>사장님</span>
        </h2>
        <h3 className='text-displayMedium text-gray600'>
          조회수가 {HITS_COUNT_PERCENT}% 올랐어요
        </h3>
      </div>
      <p className='text-labelLarge text-gray500'>전날 대비</p>
    </header>
  );
}
