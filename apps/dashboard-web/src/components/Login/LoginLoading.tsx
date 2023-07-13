'use client';

import Lottie from 'lottie-react';
import { useEffect } from 'react';

import LoadingLottie from '@/assets/loading.json';

const LoginLoadingComponent = () => {
  useEffect(() => {
    console.log('LoginLoadingComponent');
  }, []);
  return (
    <Lottie
      loop
      animationData={LoadingLottie}
      style={{ width: '220px', height: '220px', margin: '0 auto' }}
    />
  );
};

export default LoginLoadingComponent;
