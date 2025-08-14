import NavigationBar from './_components/navigation-bar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='w-full h-full pb-20 bg-white overflow-y-auto scrollbar-hide'>
        {children}
      </main>
      <NavigationBar />
    </>
  );
}
