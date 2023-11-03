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
  channel_keywords: z.array(z.string()),
  channel_tags: z.array(z.string()),
});

export type ChannelModel = z.TypeOf<typeof zChannelData>;

export const zChannelTagsKeywordsData = zChannelData.pick({
  channel_keywords: true,
  channel_tags: true,
});
