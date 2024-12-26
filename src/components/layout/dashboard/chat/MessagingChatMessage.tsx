'use client';

import { Avatar } from '@nextui-org/avatar';
import { cn } from '@nextui-org/theme';
import Image from 'next/image';
import React from 'react';

export type MessagingChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar: string;
  name: string;
  time: string;
  message: string;
  me?: boolean;
  imageUrl?: string;
};

const MessagingChatMessage = React.forwardRef<HTMLDivElement, MessagingChatMessageProps>(
  ({ avatar, name, time, message, me, imageUrl, className, ...props }, ref) => {
    const messageRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex gap-3 items-start w-full',
          { 'flex-row-reverse': me },
          className,
        )}
      >
        <div className="relative flex-none">
          <Avatar src={avatar} />
        </div>
        <div>
          <div
            className={cn('flex w-full gap-2 items-center', {
              'justify-end': me,
            })}
          >
            <div className="text-small text-default-500">{name}</div>
            <div
              className={cn('flex-end text-small text-default-200')}
            >
              {time}
            </div>
          </div>
          <div className={cn('flex relative flex-col gap-4')}>
            <div
              className={cn(
                'relative rounded-xl px-4 py-3',
                {
                  'bg-content2 text-default-600': !me,
                  'bg-primary-300 !text-white': me,
                },
                {
                  '!rounded-tr-none': me,
                  '!rounded-tl-none': !me,
                },
              )}
            >
              <div ref={messageRef} className="text-small text-default-900">
                {message}
                {imageUrl && (
                  <Image
                    alt={`Image sent by ${name}`}
                    className="mt-2 border-2 border-default-200 shadow-small"
                    height={96}
                    src={imageUrl}
                    width={264}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-0 sm:w-12 lg:w-24"></div>
      </div>
    );
  },
);

MessagingChatMessage.displayName = 'MessagingChatMessage';

export default MessagingChatMessage;
