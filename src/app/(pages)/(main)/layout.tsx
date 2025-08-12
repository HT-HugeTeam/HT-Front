import NavigationBar from './_components/navigation-bar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full min-h-screen bg-white overflow-y-auto scrollbar-hide'>
      <main className='w-full h-full pb-20'>{children}</main>
      <NavigationBar />
    </div>
  );
}
