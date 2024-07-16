import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { requestChannelBody } from '@dothis/dto';

/**
 *   @IsNotEmpty()
 *   client_id: string;
 *
 *   @IsString()
 *   channel_id?: string;
 *
 *   @IsString()
 *   channel_name?: string;
 */
export class PostRequestChannelNameBody extends createZodDto(
  extendApi(requestChannelBody),
) {}
export class PostRequestChannelIdDto extends PostRequestChannelNameBody {
  constructor(props: PostRequestChannelNameBody) {
    super();
    Object.assign(this, props);
  }
}
