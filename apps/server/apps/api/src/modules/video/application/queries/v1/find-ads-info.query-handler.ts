import { Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { GetVideoAdsInfoRes } from '@dothis/dto';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAdsInfoDto } from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { Inject } from '@nestjs/common';
import { VIDEO_ADS_INFO_IGNITE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindAdsInfoInboundPort } from '@Apps/modules/video/domain/ports/find-ads-info.inbound.port';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';

export type TFindAdsInfoRes = Result<
  IRes<GetVideoAdsInfoRes>,
  TableNotFoundException | VideoHistoryNotFoundError | VideoNotFoundError
>;

@QueryHandler(FindAdsInfoDto)
export class FindAdsInfoQueryHandler
  implements IQueryHandler<FindAdsInfoDto, TFindAdsInfoRes>
{
  constructor(
    @Inject(VIDEO_ADS_INFO_IGNITE_DI_TOKEN)
    private readonly getVideoAdsInfo: FindAdsInfoInboundPort,
  ) {}
  async execute(dto: FindAdsInfoDto): Promise<TFindAdsInfoRes> {
    return await this.getVideoAdsInfo.execute(dto);
  }
}
