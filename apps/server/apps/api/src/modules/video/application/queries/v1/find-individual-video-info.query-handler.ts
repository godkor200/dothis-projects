import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { Inject } from '@nestjs/common';
import { VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoDetailsModel } from '@dothis/dto';
import { Result } from 'oxide.ts';

import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { FindIndividualVideoInboundPort } from '@Apps/modules/video/domain/ports/find-individual-video.inbound.port';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export type TVideoIndividualRes = Result<
  IRes<VideoDetailsModel>,
  | ChannelHistoryNotFoundError
  | VideoHistoryNotFoundError
  | TableNotFoundException
>;
/**
 * 데이터 30일 미만 : “데이터가 부족합니다.”
 *
 * 데이터 30일 이상 ~ 90일 미만:
 * 날짜 -30   -25   -20   -15   -10   -5   오늘    +5
 * +5 : -5~오늘 까지의 조회수
 *
 * 데이터 90일 이상:
 * 날짜 -90   -75   -60   -45   -30   -15   오늘    +15
 * +15 : -15~오늘 까지의 조회수
 */
@QueryHandler(FindIndividualVideoInfoV1Dto)
export class FindIndividualVideoInfoQueryHandler
  implements IQueryHandler<FindIndividualVideoInfoV1Dto, TVideoIndividualRes>
{
  constructor(
    @Inject(VIDEO_INDIVIDUAL_GET_VIDEO_SERVICE_DI_TOKEN)
    private readonly findIndividualService: FindIndividualVideoInboundPort,
  ) {}

  async execute(
    query: FindIndividualVideoInfoV1Dto,
  ): Promise<TVideoIndividualRes> {
    return await this.findIndividualService.execute(query);
  }
}
