// import 'server-only';

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

  // AuthProvider는 useEffect 에 polling으로 accessToken을 주기적으로 보내주는 것이다. (polling 은 풀릴걱정이 없다 ->  렌더링 상관없이 주기적으로 요청을 보내는 것이기 때문)

  return (
    <Client
      accessToken={accessToken}
      refreshToken={refreshToken}
      isNewUser={isNewUser}
    />
  );
};

export default RedirectPage;
