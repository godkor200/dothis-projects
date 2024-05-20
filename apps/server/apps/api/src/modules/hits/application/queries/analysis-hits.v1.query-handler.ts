import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import {
  AnalysisHitsServiceInboundPort,
  TAnalysisHitsServiceRes,
} from '@Apps/modules/hits/domain/ports/analysis-hits.service.inbound.port';
import { ANALYSIS_HITS_SERVICE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAnalysisHitsDto)
export class AnalysisHitsV1QueryHandler
  implements IQueryHandler<GetAnalysisHitsDto, TAnalysisHitsServiceRes>
{
  constructor(
    @Inject(ANALYSIS_HITS_SERVICE_DI_TOKEN)
    private readonly analysisHitsService: AnalysisHitsServiceInboundPort,
  ) {}
  async execute(dto: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes> {
    return await this.analysisHitsService.execute(dto);
  }
}
