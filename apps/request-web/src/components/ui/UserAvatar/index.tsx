import type { AvatarProps, FlexProps } from '@chakra-ui/react';
import { Avatar, Flex } from '@chakra-ui/react';
import type { User } from '@prisma/client';
import type { ReactNode } from 'react';
import React from 'react';

export type UserAvatarProps = {
  user?: Partial<Pick<User, 'name' | 'image'>>;
  size: AvatarProps['w'];
  Text?: ReactNode;
} & {
  wrapperProps?: FlexProps;
} & Pick<AvatarProps, 'variant'>;
export const UserAvatar = ({
  user,
  size,
  Text,
  wrapperProps,
  ...props
}: UserAvatarProps) => {
  return (
    <Flex alignItems="center" color="gray.70" {...wrapperProps}>
      <Avatar
        w={size}
        h={size}
        name={user?.name ?? undefined}
        src={user?.image ?? undefined}
        {...props}
      />
      {Text}
    </Flex>
  );
};
