import { dehydrate } from '@tanstack/query-core';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import LoginKeyword from '@/components/Login/LoginKeyword';
import getQueryClient from '@/query/getQueryClient';
import ReactQueryHydrate from '@/query/ReactQueryHydrate';
import { apiServer } from '@/utils/apiServer';

const ChooseKeywordPage = async () => {
  const queryClient = getQueryClient();

  try {
    // 리턴값을 이용해서 진행할 처리할 경우 변수에 담아서 사용가능
    await queryClient.fetchQuery(['keyword'], () =>
      apiServer(2).user.getUserKeyword(),
    );
  } catch (error) {
    redirect('/login');
    /**
     *  throw로 error 페이지로 이동도 가능, 기획협의 후 확정
     */
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <ReactQueryHydrate state={dehydratedState}>
        <h2 className="text-grey900 text-[1.75rem] font-bold leading-9">
          분석하고 싶은 키워드를 선택해 주세요
        </h2>
        <p className="text-grey900 mb-16 pt-2 text-[0.75rem]">
          최대 5개까지 선택 할 수 있습니다.
        </p>
        <LoginKeyword />
      </ReactQueryHydrate>
    </>
  );
};

export default ChooseKeywordPage;

// Loading 체크를 위한 임시 delay 함수
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
