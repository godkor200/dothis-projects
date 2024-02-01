import { z } from 'zod';
import { zStoryBoardSchema } from './story-board';
import { dataObject } from './common.model';

// 기본 에러 스키마 정의
export const zSuccessBase = z.object({
  success: z.literal(true),
});

export const zStoryBoardCreateRes = zSuccessBase.merge(
  dataObject(zStoryBoardSchema),
);
