import { useState } from 'react';
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
      <input
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className="message-input"
        required
        minLength={1}
      />
      <button type="submit" disabled={value < 1} className="send-message">
        Send
      </button>
    </form>
  );
};
