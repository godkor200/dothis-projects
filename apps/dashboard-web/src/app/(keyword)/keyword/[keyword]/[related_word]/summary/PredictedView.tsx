'use client';

import { GUEST_AVERAGEVIEW } from '@/constants/guest';
import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';
import useGetUserChannelData from '@/hooks/react-query/query/useGetUserChannelData';

import Counter from '../Rolling';
interface Props {
  baseKeyword: string;
  relatedKeyword: string | null;
}
const PredictedView = ({ baseKeyword, relatedKeyword }: Props) => {
  const { data: apiData } = useGetDailyExpectedView({
    baseKeyword,
    relatedKeyword,
  });

  const { data: userChannelData, isLoading: userChannelIsLoading } =
    useGetUserChannelData();

  const maxExpectedHits = apiData?.data
    ? Math.max(...apiData.data[0].data.map((item) => item.expectedHits))
    : 1;

  const predictedView =
    userChannelData?.data.averageViews ??
    GUEST_AVERAGEVIEW * (maxExpectedHits ? maxExpectedHits : 1);

  return (
    <div className=" flex flex-col pb-[40px] text-center">
      <p className="text-grey600  mb-[50px]  text-[14px] font-[500]">
        키워드에 대한 시청자 수요 X 주간 검색량 변동 X 경쟁 채널의 구독자 규모
      </p>
      <p className="text-grey600  mb-[45px]  text-[14px] font-[500]">
        키워드의 평균 성과 X 채널의 평소 성과
      </p>

      <div className="text-grey600 flex items-center justify-center gap-[10px] text-[14px] font-[400]">
        <p>조회수</p>
        <div className="text-primary500   px-[10px] text-[18px] font-bold">
          <Counter value={predictedView} />
        </div>
        <p>예상</p>
        {/* 여기 조회수에 그냥 가상선택자 달아주자 */}
      </div>
    </div>
  );
};

export default PredictedView;
