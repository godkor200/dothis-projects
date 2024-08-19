import {
  FetchReqVideoInbound,
  FetchReqVideoRes,
  TFetchRequestVideoRes,
} from '@ExternalApps/feature/crawl-queue/video/domain/port/fetch-req-video.inbound.port';
import { Inject } from '@nestjs/common';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { FetchReqVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/fetch-req-video.dto';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FetchReqVideoDto)
export class FetchReqVideoService implements FetchReqVideoInbound {
  constructor(
    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,
  ) {}
  async execute(dto: FetchReqVideoDto): Promise<TFetchRequestVideoRes> {
    const { limit, page } = dto;

    try {
      const res = await this.requestVideoRepository.findAllPaginated(
        {
          limit,
          page,
        },
        { userId: 1 },
        'update_date',
        'DESC',
      );

      if (!res.count) return Err(new VideoNotFoundException());
      const mapper: FetchReqVideoRes = res.data.map((e) => ({
        clientId: e.usersClientId,
        videoUrl: e.videoId,
        managerId: e.managerId,
        vodId: e.vodId,
        operatorId: e.operatorId,
        shortformId: e.shortformId,
        updateDate: e.updateDate,
        webhookUrl: e.webhookUrl,
      }));
      return Ok(mapper);
    } catch (e) {
      return Err(e);
    }
  }
}
