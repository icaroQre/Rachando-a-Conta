'use client'

import type { AppProps } from 'next/app';
import { BillProvider } from './BillContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BillProvider>
      <Component {...pageProps} />
    </BillProvider>
  );
}
