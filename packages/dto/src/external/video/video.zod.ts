import { z } from 'zod';
import { zRequestVideoSchema } from '../video';

const { user_id, users_client_id, video_id, public_flag } =
  zRequestVideoSchema.shape;
export const requestVideoBody = z.object({
  userId: user_id,
  usersClientId: users_client_id,
  videoId: video_id,
  publicFlag: public_flag,
});

export type TRequestVideoModel = z.TypeOf<typeof zRequestVideoSchema>;
