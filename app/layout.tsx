import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import { auth } from '@/auth';
import NavBar from '@/components/NavBar';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';

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
          <NextTopLoader
            color='green'
            initialPosition={0.3}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing='ease'
            speed={200}
            shadow='0 0 10px #29D,0 0 5px #29D'
          />
          <ToastContainer position='bottom-center' />
        </body>
      </SessionProvider>
    </html>
  );
}
