'use client';

import type { MessagingChatListProps } from './data/messaging-chat-list';

import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';

import { Input } from '@nextui-org/input';
import { cn } from '@nextui-org/theme';
import { Avatar } from '@nextui-org/avatar';
import { Badge } from '@nextui-org/badge';
import { Tabs, Tab } from '@nextui-org/tabs';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useChatStore } from '@/hooks/use-chat';
import { Chip } from '@nextui-org/chip';

export type MessageChatInboxProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line no-unused-vars
  onChatClick?: (id?: string) => void;
};

const MessageChatInbox = React.forwardRef<HTMLDivElement, MessageChatInboxProps>(
  ({ onChatClick, ...props }, ref) => {
    const { currentChat, chats } = useChatStore();

    const [currentTab, setCurrentTab] = React.useState<'inbox' | 'online' | 'unread'>(
      'inbox',
    );

    const chatsToDisplay = useMemo(() => {
      if (currentTab === 'inbox') {
        return chats;
      } else if (currentTab === 'online') {
        return chats.filter((item) => item.active);
      }
      return chats.filter((item) => item.count > 0);
    }, [chats, currentTab]);

    return (
      <div ref={ref} {...props}>
        <div className="w-full relative flex flex-col h-full">
          <div className="flex w-full items-center justify-between px-3 py-3 sm:px-6">
            <div className="flex w-full gap-1 items-center text-large font-bold text-foreground justify-start">
              <h2 className="text-large font-bold text-foreground">Chats</h2>
              <Chip size="sm" variant="flat">
                24
              </Chip>
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-4 px-3 sm:px-6">
            <div>
              <div className="mb-4 lg:mb-4">
                <Input
                  aria-label="Search"
                  labelPlacement="outside"
                  placeholder="Search..."
                  radius="full"
                  startContent={
                    <Icon
                      className="text-default-500 [&>g]:stroke-[2px]"
                      icon="solar:magnifer-linear"
                      width={18}
                    />
                  }
                  variant="bordered"
                />
              </div>
              <div className="mt-4">
                <Tabs
                  fullWidth
                  onSelectionChange={(key) => {
                    setCurrentTab(key as 'inbox' | 'unread');
                  }}
                  variant='solid'
                  color='primary'
                  radius='full'
                  selectedKey={currentTab}
                >
                  <Tab key="inbox" title="Inbox" />
                  <Tab key="online" title="Online" />
                  <Tab key="unread" title="Unread" />
                </Tabs>
              </div>
            </div>
          </div>
          <ScrollShadow className="flex-1 w-full flex flex-col gap-2 overflow-y-auto relative px-2">
            {chatsToDisplay.map((item: MessagingChatListProps) => (
              <div
                key={item.id}
                className={cn(
                  'relative flex items-center p-2 rounded-lg gap-2 cursor-pointer hover:bg-default-50',
                  {
                    'bg-default-100': currentChat && currentChat.id === item.id,
                  },
                )}
                onClick={() => onChatClick?.(String(item.id))}
              >
                <Badge
                  color={item.active ? 'success' : 'default'}
                  size="sm"
                  showOutline={false}
                  placement="bottom-right"
                  content=""
                >
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.avatar}
                  />
                </Badge>
                <div className="flex-1 overflow-hidden">
                  <div className="text-small font-semibold text-default-foreground">
                    {item.name}
                  </div>
                  <div className="truncate text-small text-default-500">
                    {item.message}
                  </div>
                </div>
                {item.count > 0 && (
                  <Chip size="sm" variant="flat" color="danger">
                    {item.count}
                  </Chip>
                )}
                <div className="text-small text-default-400">{item.time}</div>
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>
    );
  },
);

MessageChatInbox.displayName = 'MessageChatInbox';

export default MessageChatInbox;
