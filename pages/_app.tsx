import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../providers/AuthProvider';
import { Layout } from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          heading: "'Zen Maru Gothic', sans-serif;",
          body: "'Zen Maru Gothic', sans-serif;",
        },
        colors: {
          brand: {
            100: '#010601',
            200: '#731C01',
            300: '#D28C07',
          },
          // withDefaultColorScheme({
          //   colorScheme: "brand",
          //   components: ["Button", "table"],
          // })
        },
      })}
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}
