import { RequestPlatformType } from '@prisma/client';
import { z } from 'zod';

import { schema as requestPostSchema } from '../RequestPostDomain/domain';

export const schema = z.object({
  id: z.bigint(),
  requestId: requestPostSchema.shape.id,
  name: z.nativeEnum(RequestPlatformType),
});

const platformTypeKor = {
  YOUTUBE: '유튜브',
  TWITCH: '트위치',
  INSTAGRAM: '인스타그램',
  FACEBOOK: '페이스북',
} satisfies Record<RequestPlatformType, unknown>;

export const constants = {
  platformTypeKor,
};
