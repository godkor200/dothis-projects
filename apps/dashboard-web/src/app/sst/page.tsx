'use client';

import { Suspense } from 'react';

import { isProduction } from '@/constants/dev';
import { apiClient } from '@/utils/api/apiClient';
import { apiServer } from '@/utils/api/apiServer';

import SSTTEST from './sstTest';

const SSTPage = () => {
  const changeUserEnvLocal = async () =>
    await apiServer(1).user.putAdminUserEnv({
      body: { isEnvLocal: !isProduction },
    });

  return (
    <>
      테스트용 페이지..
      <div>
        {
          <button onClick={() => changeUserEnvLocal()}>
            관리자용 콘솔 변경
          </button>
        }
        <Suspense fallback={<div className="bg-primary700">반갑습니다</div>}>
          <SSTTEST />
        </Suspense>
      </div>
    </>
  );
};

export default SSTPage;
