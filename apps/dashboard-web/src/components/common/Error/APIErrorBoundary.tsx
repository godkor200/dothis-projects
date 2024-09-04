import type { ClassValue } from 'clsx';
import { useState } from 'react';

import type { TKeywords } from '@/types/common';

import ApiErrorComponent from '../Charts/ApiErrorComponent ';
import NotFoundError from './NotFoundError';

interface ErrorHandlingComponentProps {
  refetchCallback: () => void;

  hasError: boolean;
  statusCode?: number;
  classname?: ClassValue;
  children: React.ReactNode;
}

const APIErrorBoundary = ({
  refetchCallback,
  statusCode,
  hasError,
  classname,
  children,
  baseKeyword,
  relatedKeyword,
}: ErrorHandlingComponentProps & TKeywords) => {
  const [retryCount, setRetryCount] = useState(0);

  const isApiError = retryCount > 2;

  const refetchHandle = () => {
    refetchCallback();
    setRetryCount((prev) => prev + 1);
  };

  const isNotFound = statusCode === 404;

  if (isNotFound) {
    return (
      <NotFoundError
        baseKeyword={baseKeyword}
        relatedKeyword={relatedKeyword}
      />
    );
  }

  if (isApiError && hasError) {
    return (
      <div
        className={`flex flex-1 items-center justify-center text-center text-[20px] font-bold ${classname}`}
      >
        <h2>
          데이터를 불러오는 데 문제가 발생했습니다.
          <br />
          빠른 시일에 문제를 해결하도록 하겠습니다.
          <br />
          이용에 불편을 드려 죄송합니다.
        </h2>
      </div>
    );
  }

  if (hasError) {
    return <ApiErrorComponent refetch={refetchHandle} classname={classname} />;
  }

  return <>{children}</>;
};

export default APIErrorBoundary;
