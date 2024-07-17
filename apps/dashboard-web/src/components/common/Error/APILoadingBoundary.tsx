import { Suspense } from 'react';

import BoxLoadingComponent from '@/app/(keyword)/keyword/BoxLoadingComponent';
import { cn } from '@/utils/cn';

const APILoadingBoundary = ({
  isLoading,
  loadingComponent,
  children,
}: {
  isLoading: boolean;
  loadingComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <>
        <BoxLoadingComponent
          classname={cn('absolute top-0 right-3 w-[80px] h-[80px]')}
        />
        {loadingComponent}
      </>
    );
  }

  return <>{children}</>;
};

export default APILoadingBoundary;
