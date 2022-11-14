import SvgFacebook from '@dothis/share/components/ui/Icons/SvgFacebook';
import SvgInstagram from '@dothis/share/components/ui/Icons/SvgInstagram';
import SvgTwitch from '@dothis/share/components/ui/Icons/SvgTwitch';
import SvgYoutube from '@dothis/share/components/ui/Icons/SvgYoutube';
import type { AwaitedReturn } from '@dothis/share/lib/types/utilityTypes';
import { strictlyOnlyRecordKey } from '@dothis/share/lib/utils';
import type { AuthPlatformType } from '@prisma/client';
import { z } from 'zod';

import { schema as userSchema } from '../UserDomain/domain';
import type { db } from './db';

export type CreatorsT = AwaitedReturn<typeof db.searchName>;
export const schema = z.object({
  id: z.bigint(),
  userId: userSchema.shape.id,
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
