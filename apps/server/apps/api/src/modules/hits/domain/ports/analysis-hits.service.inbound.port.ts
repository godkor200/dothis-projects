import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { TAnalysisViewsRes } from '@dothis/dto';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
export type TAnalysisHitsServiceRes = Result<
  IRes<TAnalysisViewsRes[]>,
  TableNotFoundException | VideoHistoryNotFoundError
>;
export interface AnalysisHitsServiceInboundPort {
  execute(props: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes>;
}
