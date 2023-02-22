import {
  SvgYoutube,
  SvgInstagram,
  SvgTwitch,
  SvgFacebook,
} from '@/components/ui/Icons';
import type { AwaitedReturn } from '@dothis/share';
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
const platformDetail = {
  YOUTUBE: {
    name: '유튜브',
    Component: () => SvgYoutube,
  },
  FACEBOOK: {
    name: '페이스북',
    Component: () => SvgFacebook,
  },
  INSTAGRAM: {
    name: '인스타그램',
    Component: () => SvgInstagram,
  },
  TWITCH: {
    name: '트위치',
    Component: () => SvgTwitch,
  },
} satisfies Record<AuthPlatformType, unknown>;

export const constants = {
  platformDetail,
};
