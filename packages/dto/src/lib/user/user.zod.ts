import { zChannelData } from '../channel';
import { zUserModel } from './user.model';
import { z } from 'zod';
export const zOwnInfo = zUserModel.shape.data.merge(
  z.object({ channel: zChannelData.optional() }),
);
export type TOwnInfoRes = z.TypeOf<typeof zOwnInfo>;
