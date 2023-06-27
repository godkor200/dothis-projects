'use client';

import { useEffect } from 'react';

import LoginLoadingComponent from '../../components/Login/LoginLoading';

function LoginLoading() {
  return (
    <div>
      <LoginLoadingComponent />
      <h2 className="mt-3 font-bold text-2xl text-center">채널 분석 중</h2>
    </div>
  );
}

export default LoginLoading;
