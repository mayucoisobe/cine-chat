import { AuthGuard } from '@/feature/auth/AuthGuard';
import { CinemaList } from '@/components/mycinema/CinemaList';

export default function mycinema(): JSX.Element {
  return (
    <>
      <AuthGuard>
        <CinemaList />
      </AuthGuard>
    </>
  );
}
