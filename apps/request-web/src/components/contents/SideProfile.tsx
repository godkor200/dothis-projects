import { Box, Text } from '@chakra-ui/react';
import {
  Button,
  colors,
  fontWeights,
  isLinkActive,
  thousandsSeparators,
  ToastBox,
  typo,
  UserAvatar,
} from '@dothis/share';
import { css } from '@emotion/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import React, { useMemo } from 'react';

import { SvgClose } from '@/components/ui';
import UserLink from '@/components/ui/Links/UserLink';
import { pagePath } from '@/constants';
import { youtubeSignIn } from '@/utils/auth';
import type { inferQueryOutput } from '@/utils/trpc';

type Props = {
  onClose(): void;
  user: NonNullable<inferQueryOutput['user']['get']>;
};

export default function SideProfile({ onClose, user }: Props) {
  const router = useRouter();
  const profilePageUrl = useMemo(() => {
    const urlObject = pagePath.user({
      userId: user.id,
    });

    return `${urlObject.pathname}?userId=${urlObject.query.userId}`;
  }, [user]);
  return (
    <div css={style}>
      <Button
        className="profile-drawer-close-button"
        aria-label="profile close button"
        onClick={onClose}
      >
        <SvgClose />
      </Button>
      <Link className="profile_my-user-page" href={pagePath.account()}>
        <UserAvatar
          user={user}
          size={48}
          Text={
            <Text as="b" ml={16} fontSize={18}>
              {user.name}
            </Text>
          }
        />
      </Link>
      <div className="profile-cache">
        <label>보유 포인트</label>
        <div className="cache-contents">
          <Box h={30} />
          {/*<div className="primary-round-circle">*/}
          {/*  <SvgPlus />*/}
          {/*</div>*/}
          <b>{thousandsSeparators(user.totalPoint)} P</b>
        </div>
      </div>
      {!user.creator && (
        <Button
          theme="primary"
          w="100%"
          h={50}
          mt={24}
          fontWeight="b"
          onClick={youtubeSignIn}
        >
          크리에이터 등록
        </Button>
      )}

      <ul className="side-profile-links">
        {user.creator && (
          <li
            className={clsx(isLinkActive(router, profilePageUrl) && 'active')}
            data-matchUrl={profilePageUrl}
          >
            <UserLink userId={user.id}>프로필 관리</UserLink>
          </li>
        )}
        <li
          className={clsx(
            isLinkActive(router, pagePath.userRequestPost()) && 'active',
          )}
        >
          <Link href={pagePath.userRequestPost()}>요청 관리</Link>
        </li>
        <li
          className={clsx(isLinkActive(router, pagePath.account()) && 'active')}
        >
          <Link href={pagePath.account()}>계정</Link>
        </li>
        <li>
          <Button onClick={() => signOut()}>로그아웃</Button>
        </li>
      </ul>
    </div>
  );
}

const style = css`
  position: relative;
  background: ${colors.white};
  width: 100vw;
  height: 100%;
  max-width: 415px;
  padding: 27px 24px;


  .profile-drawer-close-button {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 11px;
    top: 26px;
  }

  .profile-cache {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 36px;
    border: 1px solid ${colors.border['2']};
    padding: 18px;
    border-radius: 12px;

    label {
      ${typo.t3};
      font-weight: ${fontWeights.b};
      color: ${colors.gray['80']};
    }

    .cache-contents {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .primary-round-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: end;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${colors.primary.default};

        svg path {
          fill: ${colors.white};
        }
      }

      b {
        margin-top: 16px;
        ${typo.h3};
      }
    }
  }


  .side-profile-links {
    margin-top: 44px;

    li {
      position: relative;
      width: 100%;
      height: 44px;


      a, button {
        width: 100%;
        height: 100%;
        justify-content: start;

        color ${colors.black};
        ${typo.t2};
        font-weight: ${fontWeights.m};

        &:hover {
          font-weight: ${fontWeights.b};
        }
      }

      a {
        display: flex;
        align-items: center;

        &:after {
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background-image: url('/icons/list.svg');
          content: '';
        }
      }

      &.active {
        a {
          font-weight: ${fontWeights.b};

          &:after {
            display: none;
          }
        }

      }


    }

    li + li {
      margin-top: 16px;
    }
  }
`;
