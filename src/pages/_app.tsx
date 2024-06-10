import { AppProps } from 'next/app';
import { Roboto, Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const inter = Inter({
  weight: ['500'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <Head>
        <title>Pemantauan Lingkungan</title>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
