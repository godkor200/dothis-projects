import { zRequestChannelSchema } from './channel.model';
import { z } from 'zod';

const requestChannelSchema = zRequestChannelSchema;
const { client_id, channel_id } = requestChannelSchema.shape;
export const requestChannelBody = z.object({
  clientId: client_id, // @IsNotEmpty()
  channelId: channel_id, // @IsString() and optional
  channelName: z.string().optional(), // @IsString() and optional
  isPublicFlag: z
    .boolean({
      invalid_type_error: 'isPublicFlag must be a boolean',
    })
    .default(false), //공개/비공개 설정
});
export type TRequestChannelModel = z.TypeOf<typeof zRequestChannelSchema>;
