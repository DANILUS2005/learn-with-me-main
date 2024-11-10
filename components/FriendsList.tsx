import React from 'react';
import Image from 'next/image';
import { users } from '@/db/schema';

type User = typeof users.$inferSelect;

interface FriendsListProps {
  friends: User[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <ul className="space-y-4">
      {friends.map((friend) => (
        <li key={friend.id} className="flex items-center space-x-3">
          <Image
            src={friend.imageUrl || '/default-avatar.png'}
            alt={friend.name || 'Friend'}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">{friend.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;