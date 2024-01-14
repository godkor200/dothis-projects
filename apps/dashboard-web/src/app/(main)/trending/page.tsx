'use client';

import InView from '@/components/common/InView/InView';
import { clustersCategories } from '@/constants/clusterCategories';
import useGetTrendingKeywords from '@/hooks/react-query/query/useGetTrendingKeywords';
import { cn } from '@/utils/cn';
import { convertCompetitionScoreFormat } from '@/utils/contents/competitionScore';

const TrendingPage = () => {
  const trendingTableHeaders = [
    { label: '순위', key: 'rank' },
    { label: '키워드', key: 'keyword' },
    { label: '대표 카테고리', key: 'category' },
    { label: '주간 조회수', key: 'views' },
    { label: '영상 수', key: 'count' },
    { label: '경쟁강도', key: 'competitive' },
    { label: '구독자 10만 이상 채널', key: 'megachannel' },
  ];

  const { data, total } = useGetTrendingKeywords({ date: '2024-01-08' });

  return (
    <div className="relative mx-auto max-w-[1100px] translate-x-0">
      <div className="flex items-center gap-[28px] py-[30px]">
        <p className="text-grey700 text-[20px] font-bold">키워드 {total}개</p>
        <p className="text-grey500 font-bold">{'2024-01-07 - 2024-01-14'}</p>
        <button className="text-primary500 bg-primary100 rounded-8 ml-auto px-4 py-2 text-[14px]">
          엑셀 데이터로 다운로드 받기
        </button>
      </div>
      <div className="bg-grey00 rounded-8 shadow-[inset_0_0_0_2px_rgb(228,228,231)]">
        <div className="grid grid-cols-[40px_140px_140px_140px_140px_140px_minmax(150px,1fr)] items-center gap-[12px] py-[30px] pl-[18px] shadow-[inset_0_-1px_0_0_#d4d4d8]">
          {trendingTableHeaders.map(({ label, key }) => (
            <div key={key} className="text-grey500 text-[14px] font-bold">
              {label}
            </div>
          ))}
        </div>
        <ul>
          {data?.map((item, index, arr) => (
            <div
              key={index}
              className={cn(
                'grid grid-cols-[40px_140px_140px_140px_140px_140px_minmax(150px,1fr)] pl-[18px] items-center gap-[12px] ',
                {
                  'shadow-[inset_0_-2px_0_0_#f4f4f5]': index !== arr.length - 1,
                },
              )}
            >
              <div className="flex items-center gap-[10px]">
                <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                  {index + 1}
                </div>
              </div>
              <div className="text-grey700 py-[26px]text-[14px] font-bold ">
                {item._source.keyword}
              </div>
              <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                {
                  clustersCategories[
                    JSON.parse(
                      item._source.category,
                    )[0] as keyof typeof clustersCategories
                  ]
                }
              </div>
              <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                {item._source.weekly_views?.toLocaleString('ko-kr')}
              </div>
              <div className="text-grey700 py-[26px]  text-[14px] font-bold ">
                {item._source.video_count?.toLocaleString('ko-kr')}
              </div>
              <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                {convertCompetitionScoreFormat(item._source.competitive)}
              </div>
              <div className="text-grey700 py-[26px] text-[14px] font-bold ">
                {item._source.mega_channel?.toLocaleString('ko-kr')}
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="bg-primary400 fixed inset-y-0 right-0 w-[465px]">
        필터링 컴포넌트{' '}
      </div>
    </div>
  );
};

export default TrendingPage;
