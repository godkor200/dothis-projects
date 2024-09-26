import { z } from 'zod';

// IdBaseDateEntity 공통 필드 정의
const zIdBaseDateEntity = z.object({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(), // deletedAt은 선택적 필드
});

// ChannelAnalysisEntity 필드 정의
export const zChannelAnalysisEntity = zIdBaseDateEntity.extend({
  registeredChannelId: z
    .string()
    .max(255, 'registeredChannelId must be at most 255 characters long'),
  channelName: z
    .string()
    .max(255, 'channelName must be at most 255 characters long'),
  user: z.object({
    // 유저 엔티티의 id만 필요하다고 가정
    id: z.number().int().positive(),
  }),
});
export type TChannelAnalysisModel = z.TypeOf<typeof zChannelAnalysisEntity>;
