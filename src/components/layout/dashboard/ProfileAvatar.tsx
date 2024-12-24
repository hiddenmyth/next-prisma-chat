'use client';

import type { AvatarProps } from '@nextui-org/avatar';

import React from 'react';
import { Avatar } from '@nextui-org/avatar';

import { cn } from '@nextui-org/theme';

const ProfileAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      ref={ref}
      classNames={{
        ...classNames,
        base: cn('bg-transparent border border-divider !shrink-0', classNames?.base, className),
        name: cn('text-default-500 text-[0.6rem] font-semibold', classNames?.name),
      }}
      getInitials={(name) =>
        (name[0] || '') + (name[name.lastIndexOf(' ') + 1] || '').toUpperCase()
      }
      name={name}
      radius="full"
      size="sm"
      {...props}
    />
  ),
);

ProfileAvatar.displayName = 'ProfileAvatar';

export default ProfileAvatar;
