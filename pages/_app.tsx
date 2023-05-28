import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { AuthProvider } from '../providers/AuthProvider';
import { Layout } from '@/components/Layout';

const theme = extendTheme({
  fonts: {
    heading: "'Zen Maru Gothic', sans-serif;",
    body: "'Zen Maru Gothic', sans-serif;",
  },
  colors: {
    brand: {
      100: '#010601',
      200: '#c7bcb6',
      500: '#010601',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}
