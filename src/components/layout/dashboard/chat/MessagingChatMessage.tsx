"use client";

import { Avatar } from "@nextui-org/avatar";
import { cn } from "@nextui-org/theme";
import Image from "next/image";
import React, {useCallback} from "react";

export type MessagingChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar: string;
  name: string;
  time: string;
  message: string;
  me?: boolean;
  imageUrl?: string;
};

const MessagingChatMessage = React.forwardRef<HTMLDivElement, MessagingChatMessageProps>(
  ({avatar, name, time, message, me, imageUrl, className, ...props}, ref) => {
    const messageRef = React.useRef<HTMLDivElement>(null);

    const MessageAvatar = useCallback(
      () => (
        <div className="relative flex-none">
          <Avatar src={avatar} />
        </div>
      ),
      [avatar],
    );

    const Message = () => (
      <div className="flex w-full flex-col gap-4">
        <div className={cn("relative w-full rounded-lg px-4 py-3", {
          "bg-content2 text-default-600": !me,
          "bg-primary-400 !text-white": me,
        }, {
          "!rounded-br-none": me,
          "!rounded-bl-none": !me
        })}>
          <div className="flex">
            <div className="w-full text-small font-semibold">{name}</div>
            <div className={cn("flex-end text-small", {
              " text-default-400": !me,
              "text-white/60": me,
            })}>{time}</div>
          </div>
          <div ref={messageRef} className="mt-2 text-small text-default-900">
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
    );

    return (
      <div
        {...props}
        ref={ref}
        className={cn("flex gap-3", {"flex-row-reverse": me}, className)}
      >
        <MessageAvatar />
        <Message />
      </div>
    );
  },
);

MessagingChatMessage.displayName = "MessagingChatMessage";

export default MessagingChatMessage;
