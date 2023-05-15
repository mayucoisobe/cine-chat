import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { IsAuthProvider } from '../providers/IsAuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <IsAuthProvider>
        <Component {...pageProps} />
      </IsAuthProvider>
    </ChakraProvider>
  );
}
