import {
  Container,
  errorMessage,
  standaloneToast,
  ToastBox,
  typo,
} from '@dothis/share';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Login from '@/components/contents/Login';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import useMessageToast from '@/hooks/useMessageToast';
import { flushMessageSession, withSessionSSR } from '@/server/session';

export const getServerSideProps = withSessionSSR(async ({ req }) => {
  const messageProps = await flushMessageSession(req);

  return {
    props: {
      ...messageProps,
    },
  };
});

const LoginPage = ({
  session_message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { error } = router.query;

  useMessageToast(session_message);

  useEffect(() => {
    if (error != undefined) {
      standaloneToast.toast(
        ToastBox.getMessageOptions(
          errorMessage({ message: `Error : ${error}` }),
        ),
      );
    }
  }, [error]);

  return (
    <LayoutTemplate>
      <Container className={style}>
        <h2>로그인</h2>
        <Login />
      </Container>
    </LayoutTemplate>
  );
};
const style = css`
  padding-top: 32px;

  h2 {
    text-align: center;
    margin-bottom: 16px;
    ${typo.h1};
  }

  hr {
    display: none;
  }
`;

export default LoginPage;
