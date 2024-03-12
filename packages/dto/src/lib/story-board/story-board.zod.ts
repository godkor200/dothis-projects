import { z } from 'zod';
import { zSuccessBase } from '../success.response.zod';
import { dataObject } from '../common.model';
import { zStoryBoardSchema } from './story-board.model';

export const zPostStoryBoardPathParams = z.object({
  storyBoardId: z.string().describe('스토리 보드의 고유 ID'),
  overviewId: z
    .string()
    .describe('스토리 보드 개요 id, 생성된 overview id 값을 받습니다.')
    .default('1'),
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
export const zOverviewParams = zPostStoryBoardPathParams
  .pick({ overviewId: true })
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

export const zStoryBoardCreateRes = zSuccessBase.merge(
  dataObject(zStoryBoardSchema),
);
export const zStoryBoardCreateArrayRes = zSuccessBase.merge(
  dataObject(zStoryBoardSchema.array()),
);
