'use client';

import StoryBoardAdder from '@/components/StoryBoard/StoryBoardAdder';
import StoryBoardHeader from '@/components/StoryBoard/StoryBoardHeader';
import StoryBoardList from '@/components/StoryBoard/StoryBoardList';

const StoryboardPage_Intercepting = () => {
  return (
    <div className="flex w-full flex-col items-stretch gap-[10px] text-black">
      <StoryBoardHeader title="최근 항목" />
      <div className="no-scrollbar flex flex-wrap gap-[22px] overflow-auto px-5">
        <StoryBoardAdder />
        <StoryBoardList />
      </div>
    </div>
  );
};

export default StoryboardPage_Intercepting;
