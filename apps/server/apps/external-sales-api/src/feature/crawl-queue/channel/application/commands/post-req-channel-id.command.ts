import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRequestChannelIdDto } from '@ExternalApps/feature/crawl-queue/channel/application/dto/post-req-channel-id.dto';
import { Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { POST_REQUEST_CHANNEL_SERVICE_TOKEN } from '@ExternalApps/feature/crawl-queue/channel/channel.di-token.constants';
import { PostReqChannelInboundPort } from '@ExternalApps/feature/crawl-queue/channel/domain/port/post-req-channel.inbound.port';
import { ChannelDuplicateException } from '@ExternalApps/feature/crawl-queue/channel/domain/events/errors/channel.error';

export type TPostRequestChannelIdRes = Result<
  boolean,
  ChannelDuplicateException
>;
@CommandHandler(PostRequestChannelIdDto)
export class PostRequestChannelIdCommand
  implements ICommandHandler<PostRequestChannelIdDto, TPostRequestChannelIdRes>
{
  constructor(
    @Inject(POST_REQUEST_CHANNEL_SERVICE_TOKEN)
    private readonly postRequestChannelService: PostReqChannelInboundPort,
  ) {}

  async execute(
    command: PostRequestChannelIdDto,
  ): Promise<TPostRequestChannelIdRes> {
    return await this.postRequestChannelService.execute(command);
  }
}
