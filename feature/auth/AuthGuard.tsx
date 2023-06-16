import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';

type Props = { children: ReactNode };

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === 'undefined') {
    return <Box color="white">読み込み中・・・</Box>;
  }

  if (user === null) {
    push('/login');
    return null;
  }

  return <>{children}</>;
};
