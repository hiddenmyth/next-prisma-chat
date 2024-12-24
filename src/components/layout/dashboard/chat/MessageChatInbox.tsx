'use client';

import type { MessagingChatListProps } from './data/messaging-chat-list';

import React from 'react';
import { Icon } from '@iconify/react';

import MessagingChatHeader from './MessageChatHeader';
import { Input } from '@nextui-org/input';
import { cn } from '@nextui-org/theme';
import { Avatar } from '@nextui-org/avatar';
import { Badge } from '@nextui-org/badge';
import { Tabs, Tab } from '@nextui-org/tabs';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useChatStore } from '@/hooks/use-chat';

export type MessageChatInboxProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line no-unused-vars
  onChatClick?: (id?: string) => void;
};

const MessageChatInbox = React.forwardRef<HTMLDivElement, MessageChatInboxProps>(
  ({ onChatClick, ...props }, ref) => {

    const {currentChat, chats} = useChatStore();

    return (
      <div ref={ref} {...props}>
        <div className="w-full relative flex flex-col h-full">
          <MessagingChatHeader
            className="hidden sm:flex"
          />
          <div className="mb-6 flex flex-col gap-4 px-3 sm:px-6">
            <div>
              <div className="mb-4 lg:mb-4">
                <Input
                  aria-label="Search"
                  labelPlacement="outside"
                  placeholder="Search..."
                  radius="md"
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
                  classNames={{
                    cursor: 'group-data-[selected=true]:bg-content1',
                  }}
                >
                  <Tab key="inbox" title="Inbox" />
                  <Tab key="unread" title="Unread" />
                </Tabs>
              </div>
            </div>
          </div>
          <ScrollShadow className="flex-1 w-full flex flex-col gap-2 overflow-y-auto relative px-2">
            {chats.map((item: MessagingChatListProps) => (
              <div
                key={item.id}
                className={cn('relative flex items-center p-2 rounded-lg gap-2 cursor-pointer hover:bg-default-50', {
                  'bg-default-100': currentChat && currentChat.id === item.id,
                })}
                onClick={() => onChatClick?.(String(item.id))}
              >
                {item.count == 0 ? (
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.avatar}
                  />
                ) : (
                  <Badge color="danger" content={item.count}>
                    <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.avatar}
                    />
                  </Badge>
                )}
                <div className="flex-1 overflow-hidden">
                  <div className="text-small font-semibold text-default-foreground">
                    {item.name}
                  </div>
                  <div className="truncate text-small text-default-500">
                    {item.message}
                  </div>
                </div>
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
