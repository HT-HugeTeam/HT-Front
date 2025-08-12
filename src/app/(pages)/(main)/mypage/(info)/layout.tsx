import { InfoHeader } from '../_components/info-header';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full h-full'>
      <InfoHeader />
      {children}
    </div>
  );
}
