import { PostReqChannelInboundPort } from '@ExternalApps/feature/channel/domain/port/post-req-channel.inbound.port';
import { TPostRequestChannelIdRes } from '@ExternalApps/feature/channel/commands/post-req-channel-id.command';
import { PostRequestChannelNameBody } from '@ExternalApps/feature/channel/application/dto/post-req-channel-id.dto';
import { Inject } from '@nestjs/common';
import { ReqChannelOutboundPort } from '@ExternalApps/feature/channel/domain/port/post-req-channel.outbound.port';
import { REQUEST_CHANNEL_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/channel/channel.di-token.constants';
import { Err, Ok } from 'oxide.ts';
import { ChannelDuplicateException } from '@ExternalApps/feature/channel/domain/events/errors/channel.error';

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
        channelId: command.channelId,
        clientId: command.clientId,
        publicFlag: command.isPublicFlag ? 1 : 0, //허브 안에서 공개/비공개 설정
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
