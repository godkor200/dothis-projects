import { QueryHandler } from '@nestjs/cqrs';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import { Result } from 'oxide.ts';
import { GetProbabilitySuccessInboundPort } from '@Apps/modules/hits/domain/ports/get-probability-success.inbound.port';

import { Inject } from '@nestjs/common';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { PROBABILITY_SUCCESS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons/src/exceptions/exceptions';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';

export interface GetProbabilityRes {
  totalVideoCount: number;
  countAboveAverage: number;
}

export type TGetProbabilityRes = Result<
  IRes<GetProbabilityRes>,
  | VideoNotFoundError
  | TableNotFoundException
  | CacheDoesNotFoundException
  | ChannelHistoryNotFoundError
>;

@QueryHandler(GetProbabilitySuccessDto)
export class GetProbabilitySuccessQueryHandler {
  constructor(
    @Inject(PROBABILITY_SUCCESS_SERVICE_DI_TOKEN)
    private readonly getProbabilitySuccessService: GetProbabilitySuccessInboundPort,
  ) {}
  async execute(dto: GetProbabilitySuccessDto): Promise<TGetProbabilityRes> {
    return await this.getProbabilitySuccessService.execute(dto);
  }
}
