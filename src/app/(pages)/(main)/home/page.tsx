import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='w-full h-full flex-center'>
      <Link
        href='/onboarding'
        className='px-6 py-2 w-fit mx-auto bg-orange400 rounded-2xl text-white'
      >
        onboarding
      </Link>
    </div>
  );
}
