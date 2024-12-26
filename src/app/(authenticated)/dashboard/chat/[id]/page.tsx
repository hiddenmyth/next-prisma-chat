'use client';

import MessagingChatProfile from '@/components/layout/dashboard/chat/MessagingChatProfile';
import MessagingChatWindow from '@/components/layout/dashboard/chat/MessagingChatWindow';
import { useChatStore } from '@/hooks/use-chat';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@nextui-org/drawer';
import { Button } from '@nextui-org/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { cn } from '@nextui-org/theme';

export default function ChatIndivPage() {
  const {
    page,
    showProfile,
    toggleShowProfile,
    paginate,
    setShowProfile,
    isFloating,
    setCurrentChatId,
  } = useChatStore();

  const pathParams = useParams();

  useEffect(() => {
    if (pathParams.id) {
      setCurrentChatId(pathParams.id as string);
    } else {
      setCurrentChatId(undefined);
    }
  }, [pathParams, setCurrentChatId]);

  const viewProfileAction = () => {
    toggleShowProfile();
    if (isFloating) paginate(1);
  };

  const isLarge = useMediaQuery('(min-width: 1280px)');

  return isFloating ? (
    <>
      {page === 1 ? (
        <MessagingChatWindow
          viewProfileAction={viewProfileAction}
          className="h-full relative"
        />
      ) : page === 2 ? (
        <MessagingChatProfile className="h-full relative" />
      ) : null}
    </>
  ) : (
    <>
      <MessagingChatWindow
        viewProfileAction={viewProfileAction}
        className={cn("min-w-[24rem] flex-1 overflow-hidden", {
          "xl:border-r-small border-divider": showProfile
        })}
      />

      {!isLarge ? (
        <Drawer isOpen={showProfile} onOpenChange={setShowProfile}>
          <DrawerContent>
            <DrawerHeader>Profile</DrawerHeader>
            <DrawerBody>
              {showProfile && <MessagingChatProfile className="size-full relative" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : 
        <div className={cn("relative h-full w-0 hidden", {
          "w-[24rem] flex flex-col": showProfile
        })}>
          <div className="flex justify-end">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="full"
              onPress={() => setShowProfile(false)}
            >
              <Icon icon="material-symbols:close-rounded" width={18} />
            </Button>
          </div>
          <div className='flex-1 relative overflow-auto'>
            <MessagingChatProfile className="h-full relative" />
          </div>
        </div>}
    </>
  );
}
