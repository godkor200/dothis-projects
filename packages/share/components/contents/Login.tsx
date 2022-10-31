import { Box, Divider, VStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { getSession, signIn } from 'next-auth/react';
import React from 'react';

import SvgFacebook from '@/components/ui/Icons/SvgFacebook';
import SvgInstagram from '@/components/ui/Icons/SvgInstagram';
import SvgTwitch from '@/components/ui/Icons/SvgTwitch';
import SvgYoutube from '@/components/ui/Icons/SvgYoutube';
import { PAGE_KEYS, pagePath } from '@/constants';
import { useModalStore } from '@/models/modal/useModalStore';
import { withSessionSsr } from '@/server/session';

import Button from '../ui/Button';

export const getServerSideProps = withSessionSsr(async (context) => {
  const session = await getSession(context);

  if (session?.user) {
    return {
      redirect: {
        destination: pagePath.home().pathname,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default function Login() {
  return (
    <VStack css={style} spacing={20}>
      <Button theme="white" onClick={() => signIn('google')} round>
        <SvgYoutube />
        <strong>구글 로그인</strong>
      </Button>
      <Divider></Divider>
      <Button theme="white" disabled onClick={() => signIn('instagram')} round>
        <SvgInstagram />
        <strong>인스타그램 로그인</strong>
      </Button>
      <Button theme="white" disabled onClick={() => signIn('facebook')} round>
        <SvgFacebook />
        <strong>페이스북 로그인</strong>
      </Button>
      <Divider></Divider>
      <Button theme="white" disabled onClick={() => signIn('twitch')} round>
        <SvgTwitch />
        <strong>트위치 로그인</strong>
      </Button>
    </VStack>
  );
}
const style = css`
  padding: 18px 36px;

  button {
    height: 50px;
    width: 100%;
    max-width: 380px;
  }

  strong {
    display: block;
    min-width: 120px;
    margin-left: 18px;
  }
`;

Login.openModal = () => {
  useModalStore.getState().open(PAGE_KEYS.login, {
    Component: () => (
      <Box w={456}>
        <Login />
      </Box>
    ),
    title: '로그인',
  });
};
