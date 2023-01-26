import { z } from 'zod';
//TODO: zUserChannelData 정의하고 모든 db 프리머리키 id 마이그레이션
export const zUserChannelData = z.object({
  id: z.string(),
});

export type UserChannelDataModel = z.TypeOf<typeof zUserChannelData>;
