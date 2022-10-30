import Link from 'next/link';
import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { pagePath } from '@/constants';
import { useModalStore } from '@/models/modal/useModalStore';
import type { FirstParameter, MergeFirstParameter } from '@/types/utils';
import { PartialApProps } from '@/utils/common';

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
