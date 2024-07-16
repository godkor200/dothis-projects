import { PostReqVideoInboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.inbound.port';
import { Inject } from '@nestjs/common';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { PostRequestVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/post-req-video.dto';
import { TPostRequestVideoRes } from '@ExternalApps/feature/crawl-queue/video/application/commands/post-req-video.command';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { VideoDuplicateException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';

export class PostReqVideoService implements PostReqVideoInboundPort {
  constructor(
    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,
  ) {}

  async execute(command: PostRequestVideoDto): Promise<TPostRequestVideoRes> {
    try {
      const res = await this.requestVideoRepository.insert({
        userId: '1', //FIXME: 임시
        videoId: command.videoId,
        usersClientId: command.clientId,
        isShorts: 1,
        managerId: command.managerId,
        operatorId: command.operatorId,
        vodId: command.vodId,
        shortformId: command.shortformId,
        updateDate: new Date(),
      });
      return Ok(res.success);
    } catch (err) {
      if (err.message.includes('Duplicate')) {
        return Err(new VideoDuplicateException(err.message));
      }
      return err;
    }
  }
}
