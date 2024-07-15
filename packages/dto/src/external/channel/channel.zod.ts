import { zRequestChannelSchema } from './channel.model';
import { z } from 'zod';

const requestChannelSchema = zRequestChannelSchema;
const { user_id, users_client_id, channel_id, public_flag, update_date } =
  requestChannelSchema.shape;
export const requestChannelBody = z.object({
  userId: user_id, // @IsNotEmpty()
  usersClientId: users_client_id, // @IsString() and optional
  channelId: channel_id, // @IsString() and optional
  channelName: z.string().optional(), // @IsString() and optional
  isPublicFlag: z
    .boolean({
      invalid_type_error: 'isPublicFlag must be a boolean',
    })
    .default(false), // 공개/비공개 설정
});
export type TRequestChannelModel = z.TypeOf<typeof zRequestChannelSchema>;
