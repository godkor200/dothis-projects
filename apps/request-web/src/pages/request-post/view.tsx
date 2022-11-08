import Container from '@dothis/share/components/layout/Container';
import { extractQueryParams } from '@dothis/share/lib/utils';
import { useRouter } from 'next/router';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next/types';
import { z } from 'zod';

import ViewRequestPost from '@/components/contents/ViewRequestPost';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import { trpcSSG } from '@/utils/trpc';

const querySchema = z.object({
  requestId: z.string().transform(BigInt),
});

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const query = querySchema.parse(context.query);
  const trpcSSGHelpers = await trpcSSG();

  const requestDetail = await trpcSSGHelpers.requestPost.getDetail.fetch({
    id: query.requestId,
  });

  if (!requestDetail)
    return {
      notFound: true,
      redirect: {
        destination: '/404',
      },
    };

  return {
    props: {
      requestDetail,
    },
  };
};

export default function RequestViewPage({
  requestDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const query = querySchema.parse(extractQueryParams(router.asPath));

  return (
    <LayoutTemplate>
      <Container py={24}>
        <ViewRequestPost requestPost={requestDetail} />
      </Container>
    </LayoutTemplate>
  );
}
