'use client';

import Link from 'next/link';

import useGetWeeklyTrendKeyword from '@/hooks/react-query/query/useGetWeeklyTrendKeyword';
import { convertCompetitionScoreFormatToHTML } from '@/utils/contents/competitionScore';

const WeeklyKeyword = () => {
  const { data } = useGetWeeklyTrendKeyword();

  return (
    <ul className="flex flex-col gap-[15px]">
      {data?.map((item, i) => (
        <Link
          href={`/keyword/${item.recommendedKeyword}/${
            item.topAssociatedWord.split(',')[0]
          }`}
          key={item.recommendedKeyword}
        >
          <li key={i} className="gap-30 flex items-center p-[10px]">
            <p className="text-grey500">{i + 1}</p>
            <p className="flex-grow">{item.recommendedKeyword}</p>
            <div className="h-[20px] w-[20px]">
              {Math.sign(item.rankChange) === 0 ? (
                <div className="text-center">
                  <span className="">-</span>
                </div>
              ) : Math.sign(item.rankChange) === 1 ? (
                <div className="flex items-center  justify-center">
                  <span className="text-[12px] text-[#F00]">
                    {item.rankChange}
                  </span>
                  <span className="h-0 w-0 border-x-[4px] border-b-[8px]  border-x-transparent border-b-[#F00]"></span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-[12px] text-[#3183FF]">
                    {' '}
                    {item.rankChange}
                  </span>
                  <span className="h-0 w-0 border-x-[4px] border-t-[8px]  border-x-transparent border-t-[#3183FF]"></span>
                </div>
              )}
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default WeeklyKeyword;
