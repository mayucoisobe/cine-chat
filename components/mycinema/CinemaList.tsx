import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { getLists } from './sendGetList';
import { StarRating } from './StarRating';

export const CinemaList = (): JSX.Element => {
  const { user } = useAuthContext();
  const myLists = getLists(user);
  console.log(myLists);

  return (
    <>
      {user && <h1>{user.displayName}さんのmyroom</h1>}
      {myLists.length === 0 && <p>まだマイリストがありません</p>}
      {myLists &&
        myLists.map((list, index) => {
          return (
            <div key={index}>
              <p>{list.title}</p>
              <Image width="150" height="225" alt={list.title} src={list.src} />
              {list.type}
              <StarRating value={list.star} />
              <p>{list.text}</p>
              <Button
                as="a"
                target="_blank"
                variant="outline"
                rel="noopener noreferrer"
                href={`https://www.themoviedb.org/${list.type}/${list.id}`}
              >
                details
              </Button>
            </div>
          );
        })}
    </>
  );
};
