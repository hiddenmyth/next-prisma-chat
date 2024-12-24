import { Chip } from '@nextui-org/chip';
import { Icon } from '@iconify/react';

import { SidebarItemType, type SidebarItem } from './Sidebar';

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */
export const sectionNestedItems: SidebarItem[] = [
  {
    key: 'home',
    href: '/dashboard/home',
    icon: 'solar:home-2-linear',
    title: 'Home',
  },
  {
    key: 'post',
    title: 'Posts',
    icon: 'solar:notes-outline',
    itemType: SidebarItemType.nested,
    items: [
      {
        key: 'feed',
        icon: 'solar:bill-list-line-duotone',
        href: '/dashboard/p',
        title: 'Feed',
      },
      {
        key: 'create',
        icon: 'solar:add-square-broken',
        href: '/dashboard/p/create',
        title: 'Create',
      },
      {
        key: 'draft',
        icon: 'solar:gallery-edit-outline',
        href: '/dashboard/p/drafts',
        title: 'Draft',
      },
    ],
  },
  
  {
    key: 'tasks',
    href: '/dashboard/tasks',
    icon: 'solar:checklist-minimalistic-outline',
    title: 'Tasks',
    endContent: (
      <Icon
        className="text-default-400"
        icon="solar:add-circle-line-duotone"
        width={24}
      />
    ),
  },
  {
    key: 'tracker',
    href: '/dashboard/tracker',
    icon: 'solar:sort-by-time-linear',
    title: 'Tracker',
    endContent: (
      <Chip size="sm" variant="flat">
        New
      </Chip>
    ),
  },
  {
    key: 'perks',
    href: '/dashboard/perks',
    icon: 'solar:gift-linear',
    title: 'Perks',
    endContent: (
      <Chip size="sm" variant="flat">
        3
      </Chip>
    ),
  },
];
