import { Text } from '@chakra-ui/react';
import {
  Button,
  Container,
  fontWeights,
  SubmitModalTemplate,
  ToastBox,
  typo,
} from '@dothis/share';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React, { useCallback } from 'react';
import { z } from 'zod';

import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { pagePath } from '@/constants';
import { useModalStore } from '@/models/Modal';
import { withUserSessionSSR } from '@/server/session';
import { trpc, trpcSSG } from '@/utils/trpc';

const querySchema = z.object({
  searchText: z.string().optional(),
});

export const getServerSideProps = withUserSessionSSR(
  async (context, userSession) => {
    const trpcSSGHelper = await trpcSSG();
    await trpcSSGHelper.user.get.prefetch({ id: userSession.id });

    return {
      props: {
        trpcState: trpcSSGHelper.dehydrate(),
      },
    };
  },
  pagePath.home().pathname,
);

export default function AccountPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const trpcUtils = trpc.useContext();
  const modalStore = useModalStore();
  const my = trpc.user.get.useQuery({ id: session?.user.id });
  const deleteUserMutation = trpc.user.delete.useMutation({
    onSuccess() {
      if (my.data) trpcUtils.user.get.invalidate({ id: my.data.id });
      router.push(pagePath.home());
      modalStore.closeAll();
      ToastBox.successToast('회원 탈퇴가 완료되었습니다.');

      setTimeout(signOut, 200);
      // router.push(pagePath.home());
    },
  });

  const handleDelete = useCallback(async () => {
    modalStore.open('delete user', {
      title: '회원탈퇴',
      Component: () => (
        <SubmitModalTemplate
          onSubmit={() => {
            if (!my.data) {
              ToastBox.errorToast('회원탈퇴에 실패했습니다.');
              return;
            }
            deleteUserMutation.mutate({ id: my.data.id });
          }}
          submitText="탈퇴하기"
          onCancel={() => modalStore.close('delete user')}
        >
          <p>
            회원 탈퇴 후 1년간 개인정보가 임시 저장되며, 탈퇴한 계정은 복구할 수
            없습니다. 정말로 탈퇴하겠습니까?
          </p>
          <Text as="p" color="gray.70">
            * 탈퇴 시에도 작성 및 참여한 데이터는 삭제되지 않습니다.
          </Text>
        </SubmitModalTemplate>
      ),
    });
  }, [deleteUserMutation, my.data]);

  return (
    <LayoutTemplate>
      {/*<InquiryLayoutHeader />*/}
      <Container css={style}>
        <h2>계정</h2>
        <p>로그인 계정</p>
        <strong>{my.data?.email}</strong>
        <Button
          theme="primary"
          h={50}
          maxW={330}
          mt={16}
          onClick={handleDelete}
        >
          회원 탈퇴
        </Button>
      </Container>
    </LayoutTemplate>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 24px;

  p {
    font-weight: ${fontWeights.m};
  }

  h2 {
    ${typo.h1};
    margin-bottom: 16px;
  }
`;
