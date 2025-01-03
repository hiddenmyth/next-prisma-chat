'use client';

import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Spacer } from '@nextui-org/spacer';
import { sectionNestedItems } from './SidebarItems';
import Sidebar from './Sidebar';
import { cn } from '@nextui-org/theme';
import ProfileAvatar from './ProfileAvatar';
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import useOrganizationStore from '@/hooks/use-organizations';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';

export default function SidebarWrapper({
  isColorful,
  isCompact,
  children,
  isMoved,
}: {
  isCompact: boolean;
  isColorful: boolean;
  children?: ReactNode;
  isMoved?: boolean;
}) {
  const [selected, setSelected] = useState<string | undefined>('home');

  const pathname = usePathname();

  useEffect(() => {
    sectionNestedItems.forEach((item) => {
      if (item.href && pathname.startsWith(item.href)) {
        setSelected(item.key);
      }
      if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.href && pathname.startsWith(subItem.href)) {
            setSelected(subItem.key);
          }
        });
      }
    });
  }, [pathname]);

  const sidebarItems = useMemo(() => {
    return sectionNestedItems.map((item) => {
      if (item.items) {
        const hasSelected = item.items.some((subItem) => subItem.key === selected);
        return {
          ...item,
          items: item.items.map((subItem) => ({
            ...subItem,
            selected: selected === subItem.key,
          })),
          selected: hasSelected,
        };
      }
      return {
        ...item,
        selected: selected === item.key,
      };
    });
  }, [selected]);

  const { data, currentOrganization, setCurrentOrganiazation } = useOrganizationStore();

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r-small border-divider transition-[transform,opacity,margin,width] duration-250 ease-in-out',
        {
          'bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100': isColorful,
          'bg-gradient-to-b from-transparent via-transparent to-transparent': !isColorful,
        },
        {
          'w-72 p-6 pr-0': !isCompact,
          'w-20 py-6 px-3 items-center': isCompact,
        },
        {
          '-translate-x-full': isMoved,
        },
      )}
    >
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 px-2">
            {currentOrganization ? (
              <Fragment>
                <ProfileAvatar
                  size="lg"
                  name={currentOrganization.name}
                  src={currentOrganization.image}
                />
                {!isCompact && (
                  <div className="flex flex-col">
                    <p className="text-small font-medium text-default-600">
                      {currentOrganization.name}
                    </p>
                    <p className="text-tiny text-default-400">
                      {currentOrganization.description}
                    </p>
                  </div>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <ProfileAvatar size="lg">
                  <Icon icon="akar-icons:organization" width={24} />
                </ProfileAvatar>
                {!isCompact && (
                  <div className="flex flex-col">
                    <p className="text-small font-medium text-default-500">
                      Please Select
                    </p>
                    <p className="text-tiny text-default-400">Select your organization</p>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox
            aria-label="organization list"
            selectedKeys={currentOrganization ? [currentOrganization.name] : []}
            selectionMode="single"
            onSelectionChange={(keys) => {
              if (keys !== 'all' && keys.size > 0) {
                setCurrentOrganiazation(
                  data.find((val) => val.name === Array.from(keys)[0]),
                );
              } else {
                setCurrentOrganiazation(undefined);
              }
            }}
          >
            {data.map((organization) => (
              <ListboxItem aria-label="organization list" key={organization.name}>
                <div className="flex items-center gap-3 px-2">
                  <ProfileAvatar size="lg" name={organization.name} />
                  {!isCompact && (
                    <div className="flex flex-col">
                      <p className="text-small font-medium text-default-600">
                        {organization.name}
                      </p>
                      <p className="text-tiny text-default-400">
                        {organization.description}
                      </p>
                    </div>
                  )}
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        </PopoverContent>
      </Popover>
      <ScrollShadow
        className={cn('h-full max-h-full w-full relative', {
          '-mr-6  py-6 pr-6': !isCompact,
          '-mr-2 py-2 pr-2': isCompact,
        })}
      >
        <Sidebar items={sidebarItems} isCompact={isCompact} />
      </ScrollShadow>

      <Spacer y={8} />

      {children}
    </div>
  );
}
