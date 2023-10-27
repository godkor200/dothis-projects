'use client';

import useKeyword from '@/hooks/user/useKeyword';
import { SUMMARY, type SummaryItem } from '@/mocks/chart/summary';

const Summary = () => {
  const { hashKeywordList } = useKeyword();
  return (
    <ul className="flex gap-[22px]">
      <SummaryItem
        key={'키워드'}
        title={'키워드'}
        content={hashKeywordList[0]}
      />
      <SummaryItem
        key={'기대 조회 수'}
        title={'기대 조회 수'}
        content={'17.51배'}
      />
      <SummaryItem
        key={'경쟁 강도'}
        title={'경쟁 강도'}
        content={'아주 좋음 😄'}
      />
    </ul>
  );
};

const SummaryItem = ({ title, content }: SummaryItem) => {
  return (
    <li className="rounded-8 bg-primary50 w-[18.1rem] grow py-5">
      <div className="border-primary500 border-l-2 pl-[25px] font-bold">
        <div className="text-primary500 text-[26px]">{content}</div>
        <div className="text-grey600 mb-1">{title}</div>
      </div>
    </li>
  );
};

export default Summary;
