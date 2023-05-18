import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// メッセージデータをfirebaseに追加
async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, 'chatrooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      timestamp: serverTimestamp(),
      text: text.trim(),
    });
  } catch (error) {
    console.log(error);
  }
}

// メッセージデータをfirebaseから取得
function getMessages(roomId, callback) {
  return onSnapshot(
    query(collection(db, 'chatrooms', roomId, 'messages'), orderBy('timestamp', 'asc')),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    }
  );
}

export { sendMessage, getMessages };
