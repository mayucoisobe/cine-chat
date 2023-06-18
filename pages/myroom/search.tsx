import { HeadMeta } from '@/components/organisms/HeadMeta';
import { CinemaSearch } from '@/components/mycinema/CinemaSearch';

export default function add(): JSX.Element {
  return (
    <>
      <HeadMeta title={'Search | cinemyroom'} description={'cinemyroomの検索ページです。'} />
      <CinemaSearch />
    </>
  );
}
