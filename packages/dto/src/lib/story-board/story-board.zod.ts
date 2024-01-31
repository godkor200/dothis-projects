import { z } from 'zod';

export const zPostStoryBoardPathParams = z.object({
  storyBoardId: z.string().describe('스토리 보드의 고유 ID'),
  detailId: z.string().describe('스토리 보드 디테일 id'),
  referenceId: z.string().describe('스토리 보드 레퍼런스 id'),
  memoId: z.string().describe('스토리 보드 메모 id'),
});

export const zStoryBoardId = zPostStoryBoardPathParams.pick({
  storyBoardId: true,
});

export const zPostStoryBoardBody = z
  .object({
    value: z.string().describe('해당하는 객체의 value'),
  })
  .required();
export const zPostStoryBoardBodyBoolean = z
  .object({
    value: z.boolean().describe('해당하는 객체의 boolean'),
  })
  .required();
export const zPostStoryBoardMainParams = zStoryBoardId;

export const zPostStoryBoardOverviewParams = z
  .object({
    overviewId: z.string().describe('스토리 보드 디테일 id'),
  })
  .required();
export const zPostStoryBoardReferenceParams = zPostStoryBoardPathParams
  .pick({ storyBoardId: true })
  .required();
export const zPostStoryBoardMemoParams = zPostStoryBoardReferenceParams;
export const zStoryBoardDetails = z.union([
  z.object({ description: z.string().describe('스토리 보드 설명') }),
  z.object({ uploadDate: z.date().describe('업로드 예정날짜') }),
  z.object({ actors: z.string().describe('배우') }),
  z.object({ location: z.string().describe('촬영지') }),
]);

export type TPostStoryBoardMainParams = z.TypeOf<
  typeof zPostStoryBoardMainParams
>;
export type TPostStoryBoardBody = z.TypeOf<typeof zPostStoryBoardBody>;
