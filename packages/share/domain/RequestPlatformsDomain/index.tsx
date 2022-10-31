import { RequestPlatformType } from '@prisma/client';
import { z } from 'zod';

import RequestPostDomain from '@/domain/RequestPostDomain';
import { strictlyOnlyRecordKey } from '@/lib/utils/common';

namespace RequestPlatforms {
  export const schema = z.object({
    id: z.bigint(),
    requestId: RequestPostDomain.schema.shape.id,
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
}
export default RequestPlatforms;
