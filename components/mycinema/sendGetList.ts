import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import type { User } from '@firebase/auth';
import type { MovieProps } from './CinemaSearch';
import type { ListProps } from './CinemaList';

// type Lists = {
//   docId: string;
//   id?: string;
//   src?: string;
//   star?: number;
//   text?: string;
//   title?: string;
//   type?: string;
// };

// import { GlobalAuthState } from '@/providers/AuthProvider';

// 映画データをfirebaseに追加
async function sendList(
  user: User,
  poster: string,
  posterbg: string,
  movie: MovieProps,
  title: string,
  type: string,
  text: string,
  value: number
) {
  try {
    if (user) {
      await addDoc(collection(db, 'mycinema', user.uid, 'mylist'), {
        uid: user.uid,
        src: poster,
        srcbg: posterbg,
        title: title,
        id: movie.id,
        type: type,
        timestamp: serverTimestamp(),
        text: text,
        star: value,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// 映画データをfirebaseから取得
function useGetLists(user: User) {
  const [lists, setLists] = useState<any>([]);
  // const [lists, setLists] = useState<Lists[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'mycinema', user.uid, 'mylist'), orderBy('timestamp', 'desc')),
        (querySnapshot) => {
          const userLists = querySnapshot.docs.map((x) => ({
            docId: x.id,
            ...x.data(),
          }));
          setLists(userLists);
          console.log(userLists);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  return lists;
}

export { sendList, useGetLists };
