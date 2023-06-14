import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '@firebase/auth';
import type { Message } from '@/components/MessageList';

// メッセージデータをfirebaseに追加
async function sendMessage(roomId: string, user: User, text: string) {
  try {
    await addDoc(collection(db, 'chatrooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
      text: text.trim(),
    });
  } catch (error) {
    console.log(error);
  }
}

// メッセージデータをfirebaseから取得
function getMessages(roomId: string, callback: (messages: Message[]) => void) {
  return onSnapshot(
    query(collection(db, 'chatrooms', roomId, 'messages'), orderBy('timestamp', 'asc')),
    (querySnapshot) => {
      const messages: any = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

export { sendMessage, getMessages };
