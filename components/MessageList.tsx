import { useLayoutEffect, useRef } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMessages } from '../hooks/useMessages';

export const MessageList = ({ roomId }): JSX.Element => {
  const containerRef = useRef(null);
  const { user } = useAuthContext();
  const messages = useMessages(roomId);

  console.log(roomId);
  console.log(messages);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div ref={containerRef}>
      <ul>
        {messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))}
      </ul>
    </div>
  );
};

function Message({ message, isOwnMessage }) {
  const { displayName, text } = message;
  return (
    <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
      <h4 className="sender">{isOwnMessage ? '👤 You' : `👤${displayName}`}</h4>
      <div>💋{text}</div>
    </li>
  );
}
