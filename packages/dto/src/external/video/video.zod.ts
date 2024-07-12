import { z } from 'zod';
import { zRequestVideoSchema } from '../video';

const {
  users_client_id,
  video_id,
  is_shorts,
  manager_id,
  operator_id,
  vod_id,
} = zRequestVideoSchema.shape;
export const requestVideoBody = z.object({
  usersClientId: users_client_id,
  videoId: video_id,
  isShorts: is_shorts,
  managerId: manager_id,
  operatorId: operator_id,
  vodId: vod_id,
});

export type TRequestVideoModel = z.TypeOf<typeof zRequestVideoSchema>;
