'use client';

import Lottie from 'lottie-react';
import BoxLoading from 'public/aseets/Lottie/BoxLoading.json';

const BoxLoadingComponent = ({ classname }: { classname: string }) => {
  return (
    <div className="">
      <Lottie loop animationData={BoxLoading} className={classname} />
    </div>
  );
};

export default BoxLoadingComponent;
