'use client';

import type { apiRouter } from '@dothis/dto';
import type { ClientInferResponseBody } from '@ts-rest/core';
import { useRouter } from 'next/navigation';

import { useCreateStoryBoardMutation } from '@/hooks/react-query/mutation/useStoryboardMutation';

const StoryBoardAdder = () => {
  const router = useRouter();

  const createStoryBoard = useCreateStoryBoardMutation();

  return (
    <div
      className="border-1 border-grey500 flex w-[274px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded"
      onClick={() => {
        createStoryBoard.mutate({
          onSuccess: (
            res: ClientInferResponseBody<
              typeof apiRouter.storyBoard.createStoryBoard,
              200
            >,
          ) => {
            router.push(`/storyboard/${res.data?.id}`);
          },
        });
      }}
    >
      + 새 스토리보드
    </div>
  );
};

export default StoryBoardAdder;
