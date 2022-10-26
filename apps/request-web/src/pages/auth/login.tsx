import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Login from '@/components/contents/Login';
import Container from '@/components/layout/Container';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import ToastBox from '@/components/ui/ToastBox';
import { errorMessage } from '@/models/Message';
import { toast } from '@/pages/_app';
import { withSessionSsr } from '@/server/session';
import { typo } from '@/styles/chakraTheme/variable';

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { message = null } = req.session;
  delete req.session.message;
  await req.session.save();

  return {
    props: {
      message,
    },
  };
});

const LoginPage = ({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    if (message) {
      toast(ToastBox.getMessageOptions(message));
    }
  }, []);

  useEffect(() => {
    if (error != undefined) {
      toast(
        ToastBox.getMessageOptions(
          errorMessage({ message: `Error : ${error}` }),
        ),
      );
    }
  }, [error]);

  return (
    <LayoutTemplate>
      <Container css={style}>
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
