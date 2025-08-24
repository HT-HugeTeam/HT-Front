// import { Loader2 } from 'lucide-react';

// export function LoadingSpinner() {
//   return (
//     <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 mobile-area h-full flex justify-center items-center'>
//       <Loader2 className='w-10 h-10 text-orange400 animate-spin' />
//     </div>
//   );
// }

'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/public/lottie/loading.json';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 mobile-area h-full flex justify-center items-center'>
      <Lottie
        animationData={loadingAnimation}
        className='w-20 h-20'
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
export function LoadingSpinnerBasic() {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 mobile-area h-full flex justify-center items-center'>
      <Loader2 className='w-10 h-10 text-orange400 animate-spin' />
    </div>
  );
}
