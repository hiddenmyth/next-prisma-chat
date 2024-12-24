'use client';

import React, { useCallback } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

import MessagingChatInbox from './MessageChatInbox';
import MessagingChatWindow from './MessagingChatWindow';
import MessagingChatProfile from './MessagingChatProfile';
import SidebarDrawer from './SidebarDrawer';
import MessagingChatHeader from './MessageChatHeader';
import { useChatStore } from '@/hooks/use-chat';
import { cn } from '@nextui-org/theme';
import { useRouter } from 'next/navigation';

const variants = {
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
};

export default function ChatSidebarComponent() {
  const isLarge = useMediaQuery('(min-width: 1280px)');
  const isCompact = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { page, paginate, direction, showProfile, setShowProfile } =
    useChatStore();

  const router = useRouter()

  const onChatClick = useCallback((id?: string) => {
    router.push(`/dashboard/chat/${id}`);
    paginate(1);
  }, [paginate, router])

  const content = React.useMemo(() => {
    let component = <MessagingChatInbox onChatClick={onChatClick} className="h-full relative" />;

    if (isCompact) {
      switch (page) {
        case 1:
          component = <MessagingChatWindow className="h-full relative pb-2" />;
          break;
        case 2:
          component = <MessagingChatProfile className="h-full relative" />;
          break;
      }

      return (
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
            variants={variants}
          >
            {component}
          </m.div>
        </LazyMotion>
      );
    }

    return (
      <>
        <MessagingChatInbox onChatClick={onChatClick} className="lg:w-72 xl:w-[24rem] overflow-hidden" />
        <MessagingChatWindow className="min-w-[24rem] flex-1 overflow-hidden pb-2" />

        {!isLarge ? (
          <SidebarDrawer
            sidebarPlacement="right"
            sidebarWidth={320}
            isOpen={showProfile}
            onOpenChange={setShowProfile}
          >
            {showProfile && <MessagingChatProfile className="h-full relative" aria-hidden={!isMobile} />}
          </SidebarDrawer>
        ) : showProfile ? (
          <div className={cn('overflow-hidden w-[24rem] block')}>
            <MessagingChatProfile className="h-full relative" />
          </div>
        ) : null}
      </>
    );
  }, [onChatClick, isCompact, isLarge, showProfile, setShowProfile, isMobile, page, direction]);

  return (
    <div className="flex-1 w-full relative">
      <div className="h-full w-full flex flex-col sm:flex-row">
        <MessagingChatHeader
          aria-hidden={!isMobile}
          className="sm:hidden"
        />
        {isCompact ? (
          <AnimatePresence custom={direction} initial={false} mode="wait">
            {content}
          </AnimatePresence>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
