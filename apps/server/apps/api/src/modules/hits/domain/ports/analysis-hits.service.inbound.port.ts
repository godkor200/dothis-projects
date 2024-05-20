import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { TAnalysisViewsRes } from '@dothis/dto';
export type TAnalysisHitsServiceRes = Result<IRes<TAnalysisViewsRes[]>, any>;
export interface AnalysisHitsServiceInboundPort {
  execute(props: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes>;
}
