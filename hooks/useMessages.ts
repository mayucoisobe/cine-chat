import { useEffect, useState } from 'react';
import { getMessages } from '../components/sendGetMessage';
import type { Message } from '@/components/MessageList';

function useMessages(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);

    return unsubscribe;
  }, [roomId]);

  return messages;
}

export { useMessages };
