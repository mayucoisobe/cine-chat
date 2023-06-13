import { useEffect, useRef } from 'react';
import { Avatar, Box, Flex, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import styles from '../styles/messageListInput.module.css';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMessages } from '../hooks/useMessages';
import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

type Timestamp = {
  it: {
    seconds: number;
    nanoseconds: number;
  };
};

type Message = {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  timestamp: {
    it: {
      seconds: number;
      nanoseconds: number;
    };
  };
};

export const MessageList = ({ roomId }: { roomId: string }): JSX.Element => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();
  const messages = useMessages(roomId);

  useEffect(() => {
    scrollBottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    console.log(scrollBottomRef.current);
  }, [messages]);

  return (
    <List className={styles.frameGradient} p={{ base: 5, sm: 7 }} my={5}>
      {messages.map((x: Message) => (
        <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
      ))}
      <div ref={scrollBottomRef}></div>
    </List>
  );
};

// timestamp型のデータを変換;
const time = (date: Timestamp | null) => {
  console.log(date);
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

function Message({ message, isOwnMessage }: { message: Message; isOwnMessage: boolean }) {
  console.log(message);
  const { displayName, photoURL, text, timestamp } = message;
  return (
    <ListItem className={['message', isOwnMessage && 'own-message'].join(' ')} py={5}>
      <Flex flexDirection={isOwnMessage ? 'row-reverse' : 'row'} gap={2}>
        <Box>
          <Avatar size={{ base: 'sm', sm: 'md' }} name={displayName} src={photoURL} />
        </Box>
        <Box>
          <Flex justifyContent={isOwnMessage ? 'flex-end' : 'flex-start'}>
            <Heading as="h4" fontSize={{ base: '10px', sm: 'xs' }} className="sender">
              {isOwnMessage ? 'You' : `${displayName}`}
            </Heading>
            <Text as="span" fontSize="10px" px={2}>
              {time(timestamp)}
            </Text>
          </Flex>
          <Text fontSize={{ base: 'sm', sm: 'md' }} align="left">
            {text}
          </Text>
        </Box>
      </Flex>
    </ListItem>
  );
}
