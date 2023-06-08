import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { GlobalAuthState } from '@/providers/AuthProvider';

// 映画データをfirebaseに追加
async function sendList(
  user: GlobalAuthState,
  poster: string,
  posterbg: string,
  movie,
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
function getLists(user: GlobalAuthState) {
  const [lists, setLists] = useState([]);

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

export { sendList, getLists };
