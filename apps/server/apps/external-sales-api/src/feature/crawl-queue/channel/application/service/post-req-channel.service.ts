import { PostReqChannelInboundPort } from '@ExternalApps/feature/crawl-queue/channel/domain/port/post-req-channel.inbound.port';
import { TPostRequestChannelIdRes } from '@ExternalApps/feature/crawl-queue/channel/application/commands/post-req-channel-id.command';
import { PostRequestChannelNameBody } from '@ExternalApps/feature/crawl-queue/channel/application/dto/post-req-channel-id.dto';
import { Inject } from '@nestjs/common';
import { ReqChannelOutboundPort } from '@ExternalApps/feature/crawl-queue/channel/domain/port/post-req-channel.outbound.port';
import { REQUEST_CHANNEL_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/channel/channel.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { ChannelDuplicateException } from '@ExternalApps/feature/crawl-queue/channel/domain/events/errors/channel.error';

export class PostRequestChannelService implements PostReqChannelInboundPort {
  constructor(
    @Inject(REQUEST_CHANNEL_REPOSITORY_DI_TOKEN)
    private readonly requestChannelRepository: ReqChannelOutboundPort,
  ) {}

  async execute(
    command: PostRequestChannelNameBody,
  ): Promise<TPostRequestChannelIdRes> {
    try {
      const res = await this.requestChannelRepository.insert({
        userId: '1', //FIXME: 임시
        channelId: command.channelId,
        usersClientId: command.usersClientId,
        updateDate: new Date(),
      });

      return Ok(res.success);
    } catch (err) {
      if (err.message.includes('Duplicate')) {
        return Err(new ChannelDuplicateException(err.message));
      }
      return err;
    }
  }
}
