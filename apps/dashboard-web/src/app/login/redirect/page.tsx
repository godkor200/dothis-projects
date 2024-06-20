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

  /**
   *  own-info , keyword를 서버사이드에서 실행해서 data로딩동안 기다리지않고 작동하고 싶었지만, setCookie가 client side쪽에서 진행이되다 보니깐 에러사항이 없음
   * 하지만 production에서는 prefetch 가능할듯
   */

  return (
    <Client
      accessToken={accessToken}
      refreshToken={refreshToken}
      isNewUser={isNewUser}
    />
  );
};

export default RedirectPage;
