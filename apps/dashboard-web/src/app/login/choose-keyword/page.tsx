import { dehydrate } from '@tanstack/query-core';

import LoginKeyword from '@/components/Login/LoginKeyword';
import getQueryClient from '@/query/getQueryClient';
import ReactQueryHydrate from '@/query/ReactQueryHydrate';
import { apiServer } from '@/utils/apiServer';

// const onLoading = async (ms: number) => {
//   await delay(ms);

//   return [
//     '부동산',
//     '서울',
//     '원룸전세',
//     '관악구',
//     '아파트',
//     '수도권 아파트 분양',
//     '투룸전세',
//     '은평구',
//     '은평구 부동산',
//   ];
// };

const ChooseKeywordPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['keyword'], () =>
    apiServer(2).user.getUserKeyword(),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <h2 className="text-grey900 text-[1.75rem] font-bold leading-9">
        분석하고 싶은 키워드를 선택해 주세요
      </h2>
      <p className="text-grey900 mb-16 pt-2 text-[0.75rem]">
        최대 5개까지 선택 할 수 있습니다.
      </p>
      <LoginKeyword />
    </ReactQueryHydrate>
  );
};

export default ChooseKeywordPage;
// Loading 체크를 위한 임시 delay 함수
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
