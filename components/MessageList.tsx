import { useLayoutEffect, useRef } from 'react';
import { Avatar, Box, Flex, Heading, Text, WrapItem } from '@chakra-ui/react';
import styles from '../styles/messageListInput.module.css';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMessages } from '../hooks/useMessages';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

export const MessageList = ({ roomId }): JSX.Element => {
  const containerRef = useRef(null);
  const { user } = useAuthContext();
  const messages = useMessages(roomId);

  // console.log(roomId);
  // console.log(messages);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <Box ref={containerRef} className={styles.frameGradient} p={{ base: 5, sm: 7 }} my={5}>
      {messages.map((x) => (
        <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
      ))}
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
      <WrapItem>
        <Avatar size={{ base: 'sm', sm: 'md' }} name={displayName} src={photoURL} />
      </WrapItem>
      <Flex>
        <Heading as="h4" fontSize={{ base: '10px', sm: 'xs' }} className="sender">
          {isOwnMessage ? 'You' : `${displayName}`}
        </Heading>
        <Text as="span" fontSize="10px">
          {time(timestamp)}
        </Text>
      </Flex>

      <Text>{text}</Text>
    </Box>
  );
}

// // border枠のグラデーションを変化させる
// const [x, setX] = useState(0);
// const [y, setY] = useState(100);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setX((prevX) => (prevX + 1) % 101);
//     setY((prevY) => (prevY - 2 < 0 ? 100 : prevY - 1));
//   }, 500);

//   return () => clearInterval(interval);
// }, []);

// const boxStyle = {
//   '--x': `${x}%`,
//   '--y': `${y}%`,
// };
