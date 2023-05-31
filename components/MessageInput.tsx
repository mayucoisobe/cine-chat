import { useState } from 'react';
import { Box, Button, Center, Flex, Icon, Input } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import styles from '../styles/messageListInput.module.css';
import { useAuthContext } from '@/providers/AuthProvider';
import { sendMessage } from './sendGetMessage';

export const MessageInput = ({ roomId }): JSX.Element => {
  const { user } = useAuthContext();
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    sendMessage(roomId, user, value);
    setValue('');
  };

  return (
    // <form onSubmit={handleSubmit} className="message-input-container">
    <form onSubmit={handleSubmit}>
      <Flex alignItems="center" gap={3}>
        <Box className={styles.frameGradient} flexGrow="1">
          <Input
            onChange={handleChange}
            type="text"
            value={value}
            placeholder="Enter a message"
            required
            minLength={1}
            className={styles.input}
            pl={5}
            // className="message-input"
          />
        </Box>
        <Button type="submit" disabled={value < 1} width={10} height={10} borderRadius="full">
          <Icon as={AiOutlineSend} w={5} h={5} color="brand.100" />
        </Button>
      </Flex>
    </form>
  );
};
