import React from 'react';
import type { AppProps } from 'next/app'; // Import the AppProps type
import '../app/globals.css'; // Adjust the path to your globals.css file
import RootLayout from '@/app/layout'; // Adjust the path to your RootLayout component

// Use AppProps for type annotations for Component and pageProps
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
