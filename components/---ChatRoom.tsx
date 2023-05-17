import Link from 'next/link';
import { chatRooms } from '@/components/chatrooms';

export const ChatRoom = (): JSX.Element => {
  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link href="/">Back to all rooms</Link>
      </div>
    </>
  );
};
