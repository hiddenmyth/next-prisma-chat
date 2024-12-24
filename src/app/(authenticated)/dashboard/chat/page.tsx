'use client';

import { useChatStore } from '@/hooks/use-chat';
import { useEffect } from 'react';

export default function ChatIndexPage() {
  const { setCurrentChatId } = useChatStore();

  useEffect(() => {
    setCurrentChatId(undefined);
  }, [setCurrentChatId]);

  return <div></div>;
}
