import {
  GetAnalysisHitsDto,
  GetAnalysisHitsV2Dto,
} from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { TAnalysisViewsRes } from '@dothis/dto';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type TAnalysisHitsServiceRes = Result<
  IRes<TAnalysisViewsRes[]>,
  | TableNotFoundException
  | VideoHistoryNotFoundError
  | ChannelHistoryNotFoundError
  | VideoNotFoundError
>;
export interface AnalysisHitsServiceInboundPort {
  execute(props: GetAnalysisHitsDto): Promise<TAnalysisHitsServiceRes>;
}
export interface AnalysisHitsServiceV2InboundPort {
  execute(props: GetAnalysisHitsV2Dto): Promise<TAnalysisHitsServiceRes>;
}
