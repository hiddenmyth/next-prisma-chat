'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import { cn } from '@nextui-org/theme';
import { Chip } from '@nextui-org/chip';
import { useChatStore } from '@/hooks/use-chat';

export interface MessagingChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const MessagingChatHeader = React.forwardRef<HTMLInputElement, MessagingChatHeaderProps>(
  ({ className, ...props }, ref) => {
    const { page, paginate, currentChat } = useChatStore();

    return (
      <header
        className={cn(
          'flex w-full items-center justify-between px-3 py-3 sm:px-6',
          className,
        )}
        {...props}
        ref={ref}
      >
        <div className="flex lg:hidden">
          <Button
            isIconOnly
            className="flex text-default-500"
            size="sm"
            variant="light"
            onPress={() => paginate(-1)}
          >
            <Icon height={24} icon="solar:arrow-left-outline" width={24} />
          </Button>
        </div>

        <div
          className={cn(
            'flex w-full gap-1 items-center justify-center text-large font-bold text-foreground lg:justify-start',
            {
              'sm:justify-start': page === 0,
            },
          )}
        >
          {currentChat ? (
            <>
              <h2 className="text-large font-bold text-foreground">{currentChat.name}</h2>
              <Chip
                color={currentChat.active ? 'success' : 'default'}
                size="sm"
                variant="flat"
              >
                {currentChat.active ? 'Active' : 'Offline'}
              </Chip>
            </>
          ) : null}
        </div>

        <Button
          isIconOnly
          className="ml-auto h-[28px] w-[28px] min-w-[28px] rounded-[6px] border-1 border-default-200 p-0 text-default-400"
          variant="bordered"
        >
          <Icon
            className="text-default-400 [&>g]:stroke-[2px]"
            icon="solar:pen-new-square-linear"
            width={15}
          />
        </Button>
      </header>
    );
  },
);

MessagingChatHeader.displayName = 'MessagingChatHeader';

export default MessagingChatHeader;
