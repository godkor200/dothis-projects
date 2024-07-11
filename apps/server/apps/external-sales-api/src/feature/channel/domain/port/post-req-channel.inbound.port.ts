import { TPostRequestChannelIdRes } from '@ExternalApps/feature/channel/commands/post-req-channel-id.command';
import { PostRequestChannelNameBody } from '@ExternalApps/feature/channel/application/dto/post-req-channel-id.dto';

export interface PostReqChannelInboundPort {
  execute(
    command: PostRequestChannelNameBody,
  ): Promise<TPostRequestChannelIdRes>;
}
