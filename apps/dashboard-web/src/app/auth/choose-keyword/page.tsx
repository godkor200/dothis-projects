import { dehydrate } from '@tanstack/query-core';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import LoginKeyword from '@/components/Auth/LoginKeyword';
import PrefetchHydration from '@/components/common/PrefetchHydration';
import { apiServer } from '@/utils/api/apiServer';

/**
 * Login 프로세스에서 해당 api가 연달아 실행이 되어서 이미 react query에 캐싱이 되어있는데,
 * 해당 페이지에서 serverside에서 또 prefetch를 하는 이유 -> 키워드 지정을 안한 사람이면 키워드 선택 페이지로 redirect가 되는 경우가 존재
 */
const ChooseKeywordPage = async () => {
  return (
    <>
      <PrefetchHydration
        queryKey={['keyword']}
        queryFn={() => apiServer(2).user.getUserKeyword()}
      >
        <h2 className="text-grey900 text-[1.75rem] font-bold leading-9">
          분석하고 싶은 키워드를 선택해 주세요
        </h2>
        <p className="text-grey900 mb-16 pt-2 text-[0.75rem]">
          최대 5개까지 선택 할 수 있습니다.
        </p>
        <LoginKeyword />
      </PrefetchHydration>
    </>
  );
};

export default ChooseKeywordPage;

// Loading 체크를 위한 임시 delay 함수
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
