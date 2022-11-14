import { strictlyOnlyRecordKey } from '@dothis/share/lib/utils';
import { RequestPlatformType } from '@prisma/client';
import { z } from 'zod';

import { schema as requestPostSchema } from '../RequestPostDomain/domain';

export const schema = z.object({
  id: z.bigint(),
  requestId: requestPostSchema.shape.id,
  name: z.nativeEnum(RequestPlatformType),
});

export const constants = {
  platformTypeKor: strictlyOnlyRecordKey<RequestPlatformType>()({
    YOUTUBE: '유튜브',
    TWITCH: '트위치',
    INSTAGRAM: '인스타그램',
    FACEBOOK: '페이스북',
  } as const),
};
