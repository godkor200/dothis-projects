import { CommandHandler } from '@nestjs/cqrs';
import {
  DelReqVideoInboundPort,
  TDelRequestVideoRes,
} from '@ExternalApps/feature/crawl-queue/video/domain/port/delete-req-video.inbound.port';
import { Inject } from '@nestjs/common';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { DelReqVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/delete-req-video.dto';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';

@CommandHandler(DelReqVideoDto)
export class DeleteReqVideoService implements DelReqVideoInboundPort {
  constructor(
    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,
  ) {}
  async execute(command: DelReqVideoDto): Promise<TDelRequestVideoRes> {
    try {
      const res = await this.requestVideoRepository.deleteByVodIdEtc(command);
      if (!res) return Err(new VideoNotFoundException());
      return Ok(res);
    } catch (e) {
      return Err(e);
    }
  }
}
