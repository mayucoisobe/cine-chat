import { useLayoutEffect, useRef } from 'react';
import { Avatar, Box, Heading, Text, WrapItem } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMessages } from '../hooks/useMessages';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

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
    <Box ref={containerRef}>
      <Box>
        {messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))}
      </Box>
    </Box>
  );
};

// timestamp型のデータを変換;
const time = (date: Timestamp | null) => {
  if (date) {
    let timestamp = formatDistance(new Date(), date.toDate(), {
      locale: ja,
    });
    if (timestamp.indexOf('未満') !== -1) {
      return (timestamp = 'たった今');
    } else if (timestamp.indexOf('か月') !== -1 || timestamp.indexOf('年') !== -1) {
      return (timestamp = format(date.toDate(), 'yyyy年M月d日', {
        locale: ja,
      }));
    } else {
      return (timestamp = timestamp + '前');
    }
  }
  return '';
};

function Message({ message, isOwnMessage }) {
  const { displayName, photoURL, text, timestamp } = message;
  return (
    <Box className={['message', isOwnMessage && 'own-message'].join(' ')}>
      {/* <p>
        <Image width={40} height={40} src={photoURL} alt="avatar" borderRadius="full" />
      </p> */}
      <WrapItem>
        <Avatar size="md" name={displayName} src={photoURL} />
      </WrapItem>
      <Heading as="h4" size="sm" className="sender">
        {isOwnMessage ? 'You' : `${displayName}`}
      </Heading>
      <Text as="span" fontSize="10px">
        {time(timestamp)}
      </Text>
      <Text>{text}</Text>
    </Box>
  );
}
