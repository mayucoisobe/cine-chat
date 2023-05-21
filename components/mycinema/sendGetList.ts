import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

// 映画データをfirebaseに追加
async function sendList(user, poster: string, movie, title: string, type: string, text: string, value: number) {
  try {
    if (user) {
      await addDoc(collection(db, 'mycinema', user.uid, 'user.id'), {
        uid: user.uid,
        src: poster,
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
function getLists(user) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(collection(db, 'mycinema', user.uid, 'user.id'), orderBy('timestamp', 'asc')),
        (querySnapshot) => {
          const userLists = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
          }));
          setLists(userLists);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  return lists;
}

export { sendList, getLists };

// x.uid === user.ui
