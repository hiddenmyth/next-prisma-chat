'use client';

import React from 'react';
import { Icon } from '@iconify/react';

import MessagingChatHeader from './MessagingChatHeader';
import messageInteractions from './data/messaging-interactions';
import dummyImages from './data/dummy-images';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { Card, CardBody } from '@nextui-org/card';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Tab, Tabs } from '@nextui-org/tabs';
import Image from 'next/image';
import { useChatStore } from '@/hooks/use-chat';

export type MessagingChatProfileProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line no-unused-vars
};

const MessagingChatProfile = React.forwardRef<HTMLDivElement, MessagingChatProfileProps>(
  ({ ...props }, ref) => {

    const { currentChat } = useChatStore();

    return (
      <div ref={ref} {...props}>
        <div className="w-full h-full flex flex-col">
          <MessagingChatHeader className="flex lg:hidden" />
          <div className="h-full relative w-full overflow-auto border-t-small border-default-200 lg:border-none">
            {currentChat ? (
              <ScrollShadow className="flex h-full flex-col gap-1 overflow-y-auto p-2">
                <div className="flex flex-col gap-4">
                  {/* Profile Info */}
                  <div className="flex flex-col items-center px-4 pt-2 text-center">
                    <Avatar
                      className="h-20 w-20"
                      src={currentChat.avatar}
                    />
                    <h3 className="mt-2 text-small font-semibold text-foreground">
                      {currentChat.name}
                    </h3>
                    <span className="text-small font-medium text-default-400">
                      {currentChat.name}
                    </span>
                    <div className="mt-2 flex gap-2">
                      <Link href="#">
                        <Icon
                          className="text-default-400"
                          icon="solar:user-rounded-linear"
                          width={23}
                        />
                      </Link>
                      <Link href="#">
                        <Icon
                          className="text-default-400"
                          icon="solar:map-point-linear"
                          width={22}
                        />
                      </Link>
                      <Link href="#">
                        <Icon
                          className="text-default-400"
                          icon="solar:phone-rounded-linear"
                          width={24}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="px-2">
                    <div className="text-small font-semibold text-foreground">Notes</div>
                    <Listbox aria-label="Notes" variant="flat">
                      <ListboxItem
                        key="internal-issue"
                        classNames={{
                          base: 'bg-danger-50 rounded-large  my-1 px-4 h-[42px]',
                          title: 'text-danger-800 font-semibold',
                        }}
                      >
                        Internal Issue
                      </ListboxItem>
                      <ListboxItem
                        key="pro-user"
                        classNames={{
                          base: 'bg-secondary-50 rounded-large  my-1 px-4 h-[42px]',
                          title: 'text-secondary-700 font-semibold',
                        }}
                      >
                        Pro User
                      </ListboxItem>
                      <ListboxItem
                        key="authenticated"
                        classNames={{
                          base: 'bg-primary-50 rounded-large  my-1 px-4 h-[42px]',
                          title: 'text-primary-700 font-semibold',
                        }}
                      >
                        Authenticated
                      </ListboxItem>
                    </Listbox>
                  </div>

                  {/* Interaction */}
                  <div className="px-2">
                    <div className="text-small font-semibold text-foreground">
                      Interaction
                    </div>
                    <Listbox
                      aria-label="Interaction"
                      itemClasses={{
                        base: 'relative w-full rounded-medium bg-content2 my-1 px-4',
                      }}
                      variant="flat"
                    >
                      {messageInteractions.map((interaction) => (
                        <ListboxItem key={interaction.key} textValue={interaction.title}>
                          <div className="flex overflow-hidden">
                            <div className="w-full text-small font-semibold text-foreground">
                              {interaction.title}
                            </div>
                            <div className="flex-end flex text-small text-default-400">
                              {interaction.time}
                            </div>
                          </div>
                          <div className="w-full truncate text-small text-default-500">
                            {interaction.message}
                          </div>
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </div>

                  {/* Media / Links Tabs */}
                  <div className="mb-4 px-2">
                    <Tabs
                      fullWidth
                      classNames={{
                        cursor: 'group-data-[selected=true]:bg-content1',
                      }}
                    >
                      <Tab key="media" title="Media" />
                      <Tab key="links" title="Links" />
                    </Tabs>
                  </div>
                </div>

                {/* Media */}
                <div className="mx-2 rounded-large bg-content1 p-4">
                  <div className="overflow-y-hidden">
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-3">
                      {dummyImages.map((image, index) => (
                        <Card key={index} isPressable radius="sm" shadow="sm">
                          <CardBody className="p-0 sm:aspect-[2/1] overflow-hidden">
                            <Image
                              alt={image.name}
                              className="w-full object-cover"
                              src={image.src}
                              width={200}
                              height={200}
                            />
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollShadow>
            ) : (
              <div className="size-full flex items-center justify-center">
                No Chat
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

MessagingChatProfile.displayName = 'MessagingChatProfile';

export default MessagingChatProfile;
