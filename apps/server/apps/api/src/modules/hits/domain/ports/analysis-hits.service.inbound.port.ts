import {
  GetAnalysisHitsDto,
  GetAnalysisHitsV2Dto,
} from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { TAnalysisViewsRes } from '@dothis/dto';
import { ComplexQueryException, TableNotFoundException } from '@Libs/commons';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
export type TAnalysisHitsServiceRes = Result<
  IRes<TAnalysisViewsRes[]>,
  | TableNotFoundException
  | VideoHistoryNotFoundError
  | ChannelHistoryNotFoundError
  | VideoNotFoundError
  | KeywordsNotFoundError
  | ComplexQueryException
>;
export interface AnalysisHitsServiceInboundPort {
  execute(props: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes>;
}
export interface AnalysisHitsServiceV2InboundPort {
  execute(props: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes>;
}
