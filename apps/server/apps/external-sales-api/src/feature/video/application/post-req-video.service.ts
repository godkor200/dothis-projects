import { PostReqVideoInboundPort } from '@ExternalApps/feature/video/domain/port/post-req-video.inbound.port';
import { Inject } from '@nestjs/common';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/video/video.di-token.constants';
import { PostRequestVideoDto } from '@ExternalApps/feature/video/application/dto/post-req-video.dto';
import { TPostRequestVideoRes } from '@ExternalApps/feature/video/application/commands/post-req-video.command';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/video/domain/port/post-req-video.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { VideoDuplicateException } from '@ExternalApps/feature/video/domain/events/errors/video.error';

export class PostReqVideoService implements PostReqVideoInboundPort {
  constructor(
    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,
  ) {}

  async execute(command: PostRequestVideoDto): Promise<TPostRequestVideoRes> {
    try {
      const res = await this.requestVideoRepository.insert({
        videoId: command.videoId,
        userId: command.userId,
        usersClientId: command.usersClientId,
        isShorts: command.publicFlag ? 1 : 0,
        publicFlag: command.publicFlag ? 1 : 0, //허브 안에서 공개/비공개 설정
        createDate: new Date(),
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
