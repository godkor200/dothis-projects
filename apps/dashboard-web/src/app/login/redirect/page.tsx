// import 'server-only';

import { dehydrate } from '@tanstack/query-core';

import getQueryClient from '@/query/getQueryClient';
import ReactQueryHydrate from '@/query/ReactQueryHydrate';
import { apiServer } from '@/utils/apiServer';

import Client from './client';

const RedirectPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const accessToken = searchParams.accessToken;
  const refreshToken = searchParams.refreshToken;
  const isNewUser = searchParams.isNewUser;

  // cookie set은 server action이나 route Handler에서만 가능하다.
  // cookiesStore.set('refreshToken', `Bearer ${searchParams.refreshToken}`);

  // AuthProvider는 useEffect 에 polling으로 accessToken을 주기적으로 보내주는 것이다. (polling 은 풀릴걱정이 없다 ->  렌더링 상관없이 주기적으로 요청을 보내는 것이기 때문)
  // 병국님께 여쭤보기  verifyToken이  access토큰만인지??? 아니면 refresh도 포함인지
  // 만약 refresh가 포함이 아니라면 refresh도 관통하는 로직도 생각해봐야함
  // 그럼 이제 자동로그인은 state가 있어야한다.

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['my'], () => apiServer.auth.getOwnInfo());

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Client
        accessToken={accessToken}
        refreshToken={refreshToken}
        isNewUser={isNewUser}
      />
    </ReactQueryHydrate>
  );
};

export default RedirectPage;
