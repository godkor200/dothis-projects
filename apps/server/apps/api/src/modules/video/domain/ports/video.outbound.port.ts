import {
  RelatedVideoAndVideoHistoryDao,
  SearchRelationVideoAndHistoryDao,
  SearchRelationVideoDao,
} from '@Apps/modules/hits/infrastructure/daos/video.dao';
import { Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video_history/domain/event/video_history.err';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IVideoSchema } from '@Apps/modules/video/infrastructure/daos/video.res';
export type TRelatedVideoAndHistoryRes = Result<
  GetRelatedVideoAndVideoHistory[],
  VideoNotFoundError | VideoHistoryNotFoundError
>;

export type TRelatedVideos = Result<
  IVideoSchema[],
  VideoNotFoundError | VideoHistoryNotFoundError
>;
export interface VideoOutboundPort {
  getRelatedVideoAndVideoHistory(
    props: RelatedVideoAndVideoHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes>;

  getRelatedVideos(props: SearchRelationVideoDao): Promise<TRelatedVideos>;
}
