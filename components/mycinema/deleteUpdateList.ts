import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

// 映画データをfirebaseから削除
async function deleteList(user, docId: string) {
  try {
    if (user) {
      const listRef = doc(db, 'mycinema', user.uid, 'mylist', docId);
      await deleteDoc(listRef);
    }
  } catch (error) {
    console.log(error);
  }
}

// 映画データを編集
async function updateList(user, docId: string, text: string, value: number) {
  try {
    if (user) {
      const listRef = doc(db, 'mycinema', user.uid, 'mylist', docId);
      await updateDoc(listRef, { text: text, star: value });
    }
  } catch (error) {
    console.log(error);
  }
}

export { deleteList, updateList };
