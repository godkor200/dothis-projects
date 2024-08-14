import { TPostRequestChannelIdRes } from '@ExternalApps/feature/crawl-queue/channel/application/commands/post-req-channel-id.command';
import { PostRequestChannelNameBody } from '@ExternalApps/feature/crawl-queue/channel/application/dto/post-req-channel-id.dto';

export interface PostReqChannelInboundPort {
  execute(
    command: PostRequestChannelNameBody,
  ): Promise<TPostRequestChannelIdRes>;
}
