import { QueryHandler } from '@nestjs/cqrs';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import { Result } from 'oxide.ts';
import { GetProbabilitySuccessInboundPort } from '@Apps/modules/hits/domain/ports/get-probability-success.inbound.port';

import { Inject } from '@nestjs/common';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { IRes } from '@Libs/types';
import { PROBABILITY_SUCCESS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import {
  CacheDoesNotFoundException,
  TableNotFoundException,
} from '@Libs/commons';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

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
  | KeywordsNotFoundError
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
