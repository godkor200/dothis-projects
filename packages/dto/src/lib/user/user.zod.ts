import { zChannelSchema } from '../channel';
import { dataObject } from '../common.model';
import { zUserModel } from './user.model';
import { z } from 'zod';
export const zOwnInfo = dataObject(
  zUserModel.shape.data.merge(z.object({ channel: zChannelSchema.optional() })),
);
export type TOwnInfoRes = z.TypeOf<typeof zOwnInfo>;
