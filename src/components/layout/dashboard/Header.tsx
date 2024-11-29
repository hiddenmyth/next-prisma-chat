'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import useDashboardLayoutStore from '@/hooks/use-dashboard-layout';
import { Icon } from '@iconify/react/dist/iconify.js';
import ProfileAvatar from './ProfileAvatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';

export default function Header(props: { session?: Session }) {
  const pathname = usePathname();
  // eslint-disable-next-line no-unused-vars
  const isActive: (p: string) => boolean = (p) => pathname === p;

  const { session } = props;

  const isAuthenticated = !!session;

  const { isCollapsed, onOpenChange } = useDashboardLayoutStore();

  return (
    <nav className="w-auto flex items-center gap-4 p-4 border-b border-divider">
      <Button isIconOnly onClick={onOpenChange} variant="light">
        <Icon
          icon={
            isCollapsed ? 'solar:hamburger-menu-linear' : 'solar:hamburger-menu-broken'
          }
          width={24}
        />
      </Button>
      <div className="flex-1 flex items-center gap-4">
        <Link href="/dashboard/p" className="bold" data-active={isActive('/dashboard/p')}>
          Feed
        </Link>
        {isAuthenticated && (
          <Fragment>
            <Link
              href="/dashboard/p/drafts"
              data-active={isActive('/dashboard/p/drafts')}
            >
              My drafts
            </Link>
            <Link
              href="/dashboard/p/create"
              data-active={isActive('/dashboard/p/create')}
            >
              New post
            </Link>
          </Fragment>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <Button as={Link} href="/auth/signin">
            Log in
          </Button>
        ) : (
          <Fragment>
            <Dropdown>
              <DropdownTrigger>
                <ProfileAvatar
                  className="cursor-pointer"
                  size="md"
                  name={session.user?.name ?? undefined}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key={'profile'}>
                  {session.user?.name}
                  <div className="text-sm text-default-500">{session.user?.email}</div>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  variant="solid"
                  key={'signout'}
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Fragment>
        )}
      </div>
    </nav>
  );
}
