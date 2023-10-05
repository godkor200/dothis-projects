'use client';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { apiInstance } from '@/utils/apiInstance';

//자동 로그인관련 Provider - verify token api 구현 시 작성 예정
const AuthProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthProvider;
