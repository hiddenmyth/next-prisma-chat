'use client';

import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

import MessagingChatMessage from './MessagingChatMessage';
import MessagingChatInput from './MessageChatInput';
import MessagingChatHeader from './MessageChatHeader';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { useChatStore } from '@/hooks/use-chat';
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts';

export type MessagingChatWindowProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line no-unused-vars
};

const MessagingChatWindow = React.forwardRef<HTMLDivElement, MessagingChatWindowProps>(
  ({ ...props }, ref) => {
    const { currentChat, paginate, toggleShowProfile, messages } = useChatStore();
    const isCompact = useMediaQuery("(max-width: 1024px)");

    const viewProfileAction = () => {
      if (!isCompact) {
        toggleShowProfile();
      } else {
        paginate?.(1);
      }
    }

    const scrollerRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line no-unused-vars
    const { isIntersecting } = useIntersectionObserver({
      threshold: 0.5,
      onChange(isIntersecting) {
        if (isIntersecting) {
          console.log ('Reached the bottom of the chat window');
        }
      },
    })

    useEffect(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
      }
    }, [currentChat?.id])

    return (
      <div ref={ref} {...props}>
        <div className="w-full relative flex flex-col sm:border-default-200 lg:border-l-small xl:border-r-small h-full">
          <MessagingChatHeader className="hidden sm:flex lg:hidden" />
          <div className="h-17 flex items-center gap-2 border-y-small border-default-200 p-3 sm:p-4 lg:border-t-0">
            <div className="w-full">
              <div className="text-small font-semibold">
                Application for launch promotion
              </div>
              <div className="mt-1 text-small text-default-500">Via Web</div>
            </div>
            <div className="flex-end flex cursor-pointer">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly className="min-w-6 text-default-500" variant="light">
                    <Icon icon="solar:menu-dots-bold" width={24} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(key: React.Key) => {
                    if (key === 'view_profile') {
                      viewProfileAction();
                    }
                  }}
                >
                  <DropdownItem key="view_profile">
                    View Profile
                  </DropdownItem>
                  <DropdownItem key="mark_as_spam">Mark as spam</DropdownItem>
                  <DropdownItem key="delete" className="text-danger">
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-1 w-full overflow-auto">
            {currentChat ? (
              <ScrollShadow ref={scrollerRef} visibility='top' className="flex max-h-full flex-col-reverse gap-6 px-6 py-4">
                {messages.reverse().map((messagingChatConversation, idx) => (
                  <MessagingChatMessage key={idx} {...messagingChatConversation} />
                ))}
              </ScrollShadow>
            ) : (
              <div className="size-full flex-1 flex items-center justify-center">
                No Chat Selected
              </div>
            )}
          </div>
          <div className="mx-2 mt-auto flex flex-col">
            <MessagingChatInput />
          </div>
        </div>
      </div>
    );
  },
);

MessagingChatWindow.displayName = 'MessagingChatWindow';

export default MessagingChatWindow;
