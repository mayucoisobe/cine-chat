import { Container, Heading } from '@chakra-ui/react';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { HeadMeta } from '@/components/organisms/HeadMeta';
import { HeadTitle } from '@/components/molecules/HeadTitle';
import { ChartDoughnut } from '@/components/organisms/Analyze/ChartDoughnut';
import { ChartVerticalBar } from '@/components/organisms/Analyze/ChartVerticalBar';

export default function Analyze(): JSX.Element {
  return (
    <>
      <HeadMeta
        title={'Analyze | cinemyroom'}
        description={'cinemyroomの分析ページです。'}
        url={'https://cinemyroom.vercel.app/analyze'}
        type={'article'}
      />
      <AuthGuard>
        <Container bg="brand.100" px={{ base: '4', sm: '6' }} minHeight="calc(100vh - 80px)">
          <HeadTitle title={'分析ページ<仮>'} />
          <ChartVerticalBar />
          <ChartDoughnut />
        </Container>
      </AuthGuard>
    </>
  );
}
