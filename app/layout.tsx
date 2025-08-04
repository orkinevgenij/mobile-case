import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import { auth } from '@/auth';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});
export const metadata: Metadata = {
  title: 'Mobile Case',
  description: 'Case',
  icons: { icon: '/logo.png' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const brands = await getBrands();
  const series = await getSeries();
  const models = await getModels();

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={`${poppins.variable}  antialiased flex flex-col min-h-screen `}>
          <NavBar brands={brands} series={series} models={models} />
          <main className='flex-grow'>{children}</main>
          <Footer />
          <ToastContainer position='bottom-center' />
        </body>
      </SessionProvider>
    </html>
  );
}
