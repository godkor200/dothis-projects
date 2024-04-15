'use client';

import StoryBoardEditor from '@/components/StoryBoard/StoryBoardEditor';
import StoryBoardHeader from '@/components/StoryBoard/StoryBoardHeader';

const StoryboardDetailPage = ({
  params: { storyboard_id },
}: {
  params: { storyboard_id: string };
}) => {
  return (
    <div
      className="no-scrollbar flex h-screen w-full flex-col items-stretch gap-[10px] overflow-y-auto text-black"
      id="storyboard-detail-page"
    >
      <StoryBoardHeader button="export" />
      <StoryBoardEditor storyBoardId={storyboard_id} />
    </div>
  );
};

export default StoryboardDetailPage;
