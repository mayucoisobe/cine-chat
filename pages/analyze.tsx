import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { HeadMeta } from '@/components/organisms/HeadMeta';
import { ChartDoughnut } from '@/components/analytics/ChartDoughnut';
import { ChartVerticalBar } from '@/components/analytics/ChartVerticalBar';

export default function Analyze(): JSX.Element {
  return (
    <>
      <HeadMeta title={'Analyze | cinemyroom'} description={'cinemyroomの分析ページです。'} />
      <AuthGuard>
        <Container bg="brand.100" px={{ base: '4', sm: '6' }} minHeight="calc(100vh - 80px)">
          <Heading as="h2" color="white" textAlign="center" my={10} fontSize="3xl">
            偏愛MAP
          </Heading>
          <ChartVerticalBar />
          <ChartDoughnut />
        </Container>
      </AuthGuard>
    </>
  );
}
