import { User } from '@/types';

export const currentUser: User = {
  id: 'user-1',
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  email: 'john@example.com',
  walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
};

export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    username: 'janedoe',
    name: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'jane@example.com',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
  {
    id: 'user-3',
    username: 'mikebrown',
    name: 'Mike Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'mike@example.com',
  },
  {
    id: 'user-4',
    username: 'sarahsmith',
    name: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'sarah@example.com',
  },
  {
    id: 'user-5',
    username: 'alexjones',
    name: 'Alex Jones',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'alex@example.com',
  },
];