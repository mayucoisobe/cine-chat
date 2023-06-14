import { useEffect, useState } from 'react';
import { getMessages } from '../components/sendGetMessage';

function useMessages(roomId: string) {
  const [messages, setMessages] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
