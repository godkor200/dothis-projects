import { useModalStore } from '@dothis/share/lib/models';
import type { FirstParameter } from '@dothis/share/lib/types/utilityTypes';
import { PartialApProps } from '@dothis/share/lib/utils';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { pagePath } from '@/constants';

type Props = FirstParameter<typeof pagePath.user> & {
  onClick: LinkProps['onClick'];
  children: ReactNode;
};
const UserLink = PartialApProps(Link)(
  ({ userId, children, onClick, ...props }: Props) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      useModalStore.getState().closeAll();
      onClick?.(e);
    };
    return {
      href: pagePath.user({ userId }),
      onClick: handleClick,
      title: '유저 페이지 이동',
      children,
    };
  },
);

export default UserLink;
