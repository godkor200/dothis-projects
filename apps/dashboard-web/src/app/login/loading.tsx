'use client';

import { useEffect } from 'react';

import LoginLoadingComponent from '../../components/Login/LoginLoading';

const LoginLoading = () => {
  return (
    <div>
      <LoginLoadingComponent />
      <h2 className="mt-3 text-center text-2xl font-bold">채널 분석 중</h2>
    </div>
  );
};

export default LoginLoading;
