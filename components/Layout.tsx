import SplashScreen from './SplashScreen';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState<boolean>(isHome);

  useEffect(() => {
    if (isLoading) return;
  }, [isLoading]);

  return (
    <>
      {isLoading && isHome ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <Header />
          <main style={{ paddingTop: '80px' }}>{children}</main>
        </>
      )}
    </>
  );
};
