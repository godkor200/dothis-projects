import { z } from 'zod';

const zStoryBoardSchema = z
  .object({
    id: z.number().describe('스토리 보드의 고유 ID'),
    userId: z.number().describe('사용자의 ID'),
    title: z.string().describe('스토리 보드의 제목'),
    isDraft: z.boolean().describe('임시 저장 여부'),
    createdAt: z.date().describe('생성 날짜'),
    updatedAt: z.date().describe('최근 수정 날짜'),
  })
  .describe('스토리 보드의 기본 정보를 나타내는 스키마');

const zStoryBoardOverviewSchema = z
  .object({
    id: z.number().describe('스토리 보드 세부 정보의 고유 ID'),
    uploadDate: z.date().describe('유튜브 업로드 예정일'),
    describe: z.string().describe('스토리 보드의 설명'),
    actors: z.string().describe('배우 정보'),
    locations: z.string().describe('장소 정보'),
    createdAt: z.date().describe('생성 날짜'),
    updatedAt: z.date().describe('최근 수정 날짜'),
    boardId: z.number().describe('스토리 보드의 ID'),
  })
  .describe('스토리 보드의 세부 정보를 나타내는 스키마');

const zReferenceSchema = z
  .object({
    id: z.number().describe('참조 정보의 고유 ID'),
    url: z.string().describe('참조 URL'),
    category: z.string().describe('참조 카테고리'),
    createdAt: z.date().describe('생성 날짜'),
    updatedAt: z.date().describe('최근 수정 날짜'),
    storyId: z.number().describe('스토리 보드 세부 정보의 ID'),
  })
  .describe('참조 정보를 나타내는 스키마');

const zMemoSchema = z
  .object({
    id: z.number().describe('메모의 고유 ID'),
    title: z.string().describe('메모의 제목'),
    content: z.string().describe('메모의 내용'),
    createdAt: z.date().describe('생성 날짜'),
    updatedAt: z.date().describe('최근 수정 날짜'),
    storyId: z.number().describe('스토리 보드 세부 정보의 ID'),
  })
  .describe('메모 정보를 나타내는 스키마');

type TRecentStoryBoardModel = z.TypeOf<typeof zStoryBoardSchema>;
type TStoryBoardOverviewModel = z.TypeOf<typeof zStoryBoardOverviewSchema>;
type TReferenceModel = z.TypeOf<typeof zReferenceSchema>;
type TMemoModel = z.TypeOf<typeof zMemoSchema>;
export {
  zStoryBoardSchema,
  zStoryBoardOverviewSchema,
  zReferenceSchema,
  zMemoSchema,
};
export type {
  TRecentStoryBoardModel,
  TStoryBoardOverviewModel,
  TReferenceModel,
  TMemoModel,
};
