import { LoadingSpinner } from '@/components/loading-spinner';

export default function MakeVideoLoading() {
  return (
    <div className='w-full h-full flex-center bg-gray100 bg-blur-lg'>
      <LoadingSpinner />
    </div>
  );
}
