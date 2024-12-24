/* eslint-disable no-unused-vars */
import messagingChatConversations from '@/components/layout/dashboard/chat/data/messaging-chat-conversations';
import messagingChatList, {
  MessagingChatListProps,
} from '@/components/layout/dashboard/chat/data/messaging-chat-list';
import { MessagingChatMessageProps } from '@/components/layout/dashboard/chat/MessagingChatMessage';
import { create } from 'zustand';

export interface IChatStore {
  isCompact: boolean;
  setIsCompact: (val: boolean) => void;
  setCurrentChatId: (val?: string) => void;
  page: number;
  direction: number;
  paginate: (direction: number) => void;
  showProfile: boolean;
  setShowProfile: (val: boolean) => void;
  toggleShowProfile: () => void;
  chats: MessagingChatListProps[];
  currentChat: MessagingChatListProps | undefined;
  messages: MessagingChatMessageProps[];
}

export const useChatStore = create<IChatStore>((set, get) => ({
  isCompact: false,
  setIsCompact: (val) => {
    set({ isCompact: val });
  },
  setCurrentChatId: (val) => {
    if (!val) return { currentChat: undefined, messages: [] };
    const chat = get().chats.find((chat) => String(chat.id) === val);
    if (!chat) return { currentChat: undefined, messages: [] };
    set({
      currentChat: chat,
      messages: messagingChatConversations.map((conversation) =>
        conversation.me
          ? conversation
          : { ...conversation, avatar: chat.avatar, name: chat.name },
      ),
    });
  },
  page: 0,
  direction: 0,
  paginate: (newDirection) => {
    const currentPage = get().page;
    if (currentPage < 0 || currentPage > 2) return;
    set({ page: currentPage + newDirection, direction: newDirection });
  },
  showProfile: false,
  setShowProfile: (val) => {
    set({ showProfile: val });
  },
  toggleShowProfile: () => {
    set({ showProfile: !get().showProfile });
  },
  chats: messagingChatList,
  currentChat: undefined,
  messages: messagingChatConversations,
}));
