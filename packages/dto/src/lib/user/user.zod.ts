import { zChannelSchema } from '../channel';
import { dataObject } from '../common.model';
import { zUserModel } from './user.model';
import { z } from 'zod';

export const zOwnInfoSchema = zUserModel.shape.data.merge(
  z.object({
    channel: zChannelSchema.pick({
      channelId: true,
      channelName: true,
      channelDescription: true,
      channelTags: true,
      channelThumbnail: true,
      channelSince: true,
      channelCluster: true,
      channelIdPart: true, // "channel_id_part"
      channelCountry: true, // "channel_country"
      crawledDate: true, // "crawled_date"
    }),
  }),
);

export const zOwnInfo = dataObject(zOwnInfoSchema);

export type TOwnInfoRes = z.TypeOf<typeof zOwnInfoSchema>;
