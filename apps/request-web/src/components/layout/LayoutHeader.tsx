import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import {
  Button,
  colors,
  Container,
  mediaQueries,
  typo,
  UserAvatar,
} from '@dothis/share';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { HomeLogo } from '@/components/ui/HomeLogo';
import { pagePath } from '@/constants';
import { trpc } from '@/utils/trpc';

import Login from '../contents/Login';
import NewRequestPost from '../contents/NewRequestPost';
import SideProfile from '../contents/SideProfile';
import SearchInput from '../ui/SearchInput';

const Drawer = dynamic(
  () => import('@dothis/share/components/ui/Drawer').then((mod) => mod.Drawer),
  {
    ssr: false,
  },
);

export default function LayoutHeader() {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('');
  const trpcUtils = trpc.useContext();

  const router = useRouter();

  const my = trpc.user.get.useQuery(
    { id: session?.user.id },
    {
      enabled: !!session?.user.id,
    },
  );

  return (
    <header css={contentsStyle}>
      <div className="header-contents-wrapper">
        <Container className="header-contents">
          <Box className="header-logo" minW={70}>
            <HomeLogo href={pagePath.home()} />
          </Box>

          <Spacer />
          {status !== 'loading' && (
            <Flex
              gap={{
                base: 10,
                tablet: 12,
              }}
              alignItems="center"
            >
              <SearchInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="크리에이터 검색"
                onItemSelect={function (name: string) {
                  trpcUtils.creator.getMatched
                    .fetch({ name })
                    .then(({ userId }) => {
                      router.push(pagePath.user({ userId }));
                      setValue('');
                    });
                }}
                size="sm"
                theme="white"
              />

              {session ? (
                <>
                  <Box className="header-new-request">
                    <NewRequestPost.ModalLink>
                      <Button
                        theme="primary"
                        minW={96}
                        h={36}
                        round
                        tabIndex={-1}
                      >
                        요청등록
                      </Button>
                    </NewRequestPost.ModalLink>
                  </Box>

                  {/* 알림 */}
                  {/*<Button*/}
                  {/*  theme="white"*/}
                  {/*  minW={36}*/}
                  {/*  h={36}*/}
                  {/*  bgColor="bg.light"*/}
                  {/*  aria-label="show 17 new notifications"*/}
                  {/*  round*/}
                  {/*>*/}
                  {/*  <SvgBell />*/}
                  {/*</Button>*/}
                  <Button
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={onOpen}
                    round
                  >
                    <UserAvatar
                      size={36}
                      user={session.user}
                      variant="square"
                    />
                  </Button>
                </>
              ) : (
                /**************** 비로그인 ***************/
                <>
                  <Link
                    href={pagePath.login()}
                    onClick={(e) => {
                      e.preventDefault();
                      Login.openModal();
                    }}
                  >
                    <Button
                      theme="primary"
                      w={{ base: 60, tablet: 88 }}
                      h={36}
                      fontWeight="b"
                    >
                      로그인
                    </Button>
                  </Link>
                </>
              )}
            </Flex>
          )}
        </Container>
      </div>
      {my.data && (
        <Drawer isOpen={isOpen} onClose={onClose}>
          <SideProfile onClose={onClose} user={my.data} />
        </Drawer>
      )}
    </header>
  );
}

const contentsStyle = css`
  position: relative;
  padding-top: 60px;

  .header-contents-wrapper {
    position: fixed;
    width: 100%;
    height: 60px;
    left: 0;
    top: 0;

    background: ${colors.white};
    z-index: 10;
    border-bottom: 1px solid ${colors.border['1']};
  }

  .header-contents {
    display: flex;
    height: 100%;
    align-items: center;

    nav {
      display: flex;
      margin-left: 80px;

      .header-nav-link-item {
        padding-left: 16px;
        padding-right: 16px;
        color: ${colors.black};
        ${typo.t1};
      }
    }
  }

  .header-logo {
    max-width: 80px;
    margin-right: 16px;

    ${mediaQueries.tablet} {
      max-width: 113px;
    }
  }

  .header-new-request {
    display: none;

    ${mediaQueries.tablet} {
      display: block;
    }
  }
`;
