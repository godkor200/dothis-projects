import { z } from 'zod';

export const zChannelData = z.object({
  id: z.number(),
  userId: z.number(),
  channelName: z.string(),
  channelUrl: z.string(),
  channelSubsciber: z.number(),
  channelDescription: z.string(),
  channelSince: z.date(),
  channelTotalViews: z.number(),
  channelTotalVideos: z.number(),
  channelNormalVideos: z.number(),
  channelCountry: z.string(),
  channelLink: z.string(),
});

export type ChannelModel = z.TypeOf<typeof zChannelData>;
