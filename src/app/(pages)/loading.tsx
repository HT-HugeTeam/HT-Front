import { LoadingSpinner } from '@/components/loading-spinner';

export default function RootLoading() {
  return (
    <div className='w-full h-full flex-center bg-gray100 bg-blur-lg'>
      <LoadingSpinner />
    </div>
  );
}
