import { useModalStore } from '@dothis/share/lib/models';
import type { FirstParameter } from '@dothis/share/lib/types/utilityTypes';
import { PartialApProps } from '@dothis/share/lib/utils';
import Link from 'next/link';
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { pagePath } from '@/constants';

type Props = FirstParameter<typeof pagePath.user> & {
  anchorProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  children: ReactNode;
};
const UserLink = PartialApProps(Link)(
  ({ userId, children, anchorProps }: Props) => {
    const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      useModalStore.getState().closeAll();
      anchorProps?.onClick?.(e);
    };
    return {
      href: pagePath.user({ userId }),
      passHref: true,
      children: (
        <a onClick={onClick} title="유저 페이지 이동" {...anchorProps}>
          {children}
        </a>
      ),
    };
  },
);

export default UserLink;
