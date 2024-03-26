import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAdsTopHitsDto } from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';
import { Result } from 'oxide.ts';
import { GetAdsRelatedTopHitsRes } from '@dothis/dto';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { Inject } from '@nestjs/common';
import { VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindAdsTopHitsInboundPort } from '@Apps/modules/video/domain/ports/find-ads-top-hits.inbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
export type TFindAdsTopHits = Result<
  IRes<GetAdsRelatedTopHitsRes[]>,
  VideoNotFoundError | TableNotFoundException
>;
@QueryHandler(FindAdsTopHitsDto)
export class FindAdsTopHitsQueryHandler
  implements IQueryHandler<FindAdsTopHitsDto, TFindAdsTopHits>
{
  constructor(
    @Inject(VIDEO_GET_ADS_TOP_HITS_SERVICE_DI_TOKEN)
    private readonly getTopHitsAdsRelatedVideo: FindAdsTopHitsInboundPort,
  ) {}
  async execute(dto: FindAdsTopHitsDto): Promise<TFindAdsTopHits> {
    return this.getTopHitsAdsRelatedVideo.execute(dto);
  }
}
