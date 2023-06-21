import { AuthGuard } from '@/feature/auth/AuthGuard';
import { HeadMeta } from '@/components/organisms/HeadMeta';
import { CinemaList } from '@/components/mycinema/CinemaList';

export default function mycinema(): JSX.Element {
  return (
    <>
      <HeadMeta
        title={'Myroom | cinemyroom'}
        description={'cinemyroomのマイルームページです。'}
        url={'https://cinemyroom.vercel.app/myroom'}
        type={'article'}
      />
      <AuthGuard>
        <CinemaList />
      </AuthGuard>
    </>
  );
}
