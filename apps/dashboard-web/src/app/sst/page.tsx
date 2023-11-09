'use client';

import { isProduction } from '@/constants/dev';
import { apiServer } from '@/utils/api/apiServer';

const SSTPage = () => {
  const changeUserEnvLocal = async () =>
    await apiServer(1).user.putAdminUserEnv({
      body: { isEnvLocal: !isProduction },
    });

  return (
    <>
      테스트용 페이지..
      <div>
        <button onClick={() => changeUserEnvLocal()}>관리자용 콘솔 변경</button>
      </div>
    </>
  );
};

export default SSTPage;
