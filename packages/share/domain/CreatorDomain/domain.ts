import type { AuthPlatformType } from '@prisma/client';
import { z } from 'zod';

import SvgFacebook from '@/components/ui/Icons/SvgFacebook';
import SvgInstagram from '@/components/ui/Icons/SvgInstagram';
import SvgTwitch from '@/components/ui/Icons/SvgTwitch';
import SvgYoutube from '@/components/ui/Icons/SvgYoutube';
import { UserDomain } from '@/domain';
import type { db } from '@/domain/CreatorDomain/db';
import type { AwaitedReturn } from '@/lib/types/utilityTypes';
import { strictlyOnlyRecordKey } from '@/lib/utils/common';

export type CreatorsT = AwaitedReturn<typeof db.searchName>;
export const schema = z.object({
  id: z.bigint(),
  userId: UserDomain.schema.shape.id,
  createdAt: z.date(),
});
export const constants = {
  platformDetail: strictlyOnlyRecordKey<AuthPlatformType>()({
    YOUTUBE: {
      name: '유튜브',
      Component: SvgYoutube,
    },
    FACEBOOK: {
      name: '페이스북',
      Component: SvgFacebook,
    },
    INSTAGRAM: {
      name: '인스타그램',
      Component: SvgInstagram,
    },
    TWITCH: {
      name: '트위치',
      Component: SvgTwitch,
    },
  }),
} as const;


