import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
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
    <form onSubmit={handleSubmit} className="message-input-container">
      <Input
        onChange={handleChange}
        type="text"
        value={value}
        placeholder="Enter a message"
        required
        minLength={1}
        className="message-input"
      />
      <Button type="submit" disabled={value < 1} className="send-message">
        Send
      </Button>
    </form>
  );
};
