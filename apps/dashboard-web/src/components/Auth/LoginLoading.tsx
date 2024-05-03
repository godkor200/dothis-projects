'use client';

import Lottie from 'lottie-react';
import LoadingLottie from 'public/aseets/Lottie/loading-lagacy.json';
import LoadingTest from 'public/aseets/Lottie/loadingUI.json';

const LoginLoadingComponent = () => {
  return (
    <div className="bg-none">
      <Lottie
        loop
        animationData={LoadingTest}
        style={{ width: '220px', height: '220px', margin: '0 auto' }}
      />
    </div>
  );
};

export default LoginLoadingComponent;
