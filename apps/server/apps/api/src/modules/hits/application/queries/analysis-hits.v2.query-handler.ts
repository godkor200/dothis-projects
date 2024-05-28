import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnalysisHitsV2Dto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import {
  AnalysisHitsServiceV2InboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { ANALYSIS_HITS_V2_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAnalysisHitsV2Dto)
export class AnalysisHitsV2QueryHandler
  implements IQueryHandler<GetAnalysisHitsV2Dto, TAnalysisHitsServiceRes>
{
  constructor(
    @Inject(ANALYSIS_HITS_V2_SERVICE_DI_TOKEN)
    private readonly analysisHitsService: AnalysisHitsServiceV2InboundPort,
  ) {}
  async execute(dto: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes> {
    return await this.analysisHitsService.execute(dto);
  }
}
