'use client';

import Lottie from 'lottie-react';
import LoadingLottie from 'public/aseets/Lottie/loading.json';
import { useEffect } from 'react';

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
