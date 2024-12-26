'use client';

import { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/hooks/use-chat';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import MessageChatInbox from './MessageChatInbox';
import { cn } from '@nextui-org/theme';

export default function ChatLayoutComponent(props: { children: ReactNode }) {
  const { direction, page, currentChat, isFloating, paginate, setIsFloating } = useChatStore();

  const isCompact = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    setIsFloating(isCompact);
  }, [isCompact, setIsFloating]);

  const router = useRouter();

  const onChatClick = useCallback(
    (id?: string) => {
      router.push(`/dashboard/chat/${id}`);
      if(isFloating) paginate(1);
    },
    [router, paginate, isFloating],
  );

  return (
    <div className="flex flex-1 w-full relative overflow-hidden">
      <div className="flex-1 w-full relative">
        <div className="h-full w-full flex flex-col sm:flex-row">
          {isFloating && currentChat ? (
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <LazyMotion features={domAnimation}>
                <m.div
                  key={page}
                  animate="center"
                  className="col-span-12 overflow-hidden"
                  custom={direction}
                  exit="exit"
                  initial="enter"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 20 : -20,
                      opacity: 0,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 20 : -20,
                      opacity: 0,
                    }),
                  }}
                >
                  {page === 1 ? (
                    props.children
                  ) : page === 2 ? (
                    props.children
                  ) : (
                    <MessageChatInbox
                      onChatClick={onChatClick}
                      className="h-full relative"
                    />
                  )}
                </m.div>
              </LazyMotion>
            </AnimatePresence>
          ) : (
            <>
              <MessageChatInbox
                onChatClick={onChatClick}
                className={cn("lg:w-72 xl:w-[24rem] overflow-hidden", {
                  "border-r-1 border-divider": !currentChat
                })}
              />
              {props.children}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
