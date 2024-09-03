import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import {
  VideoCacheReturnType,
  VideosMultiRelatedWordsCacheType,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { TSqlParam } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';
import { DateUtil } from '@Libs/commons/utils/date.util';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { GetAnalysisHitsDto } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';

export interface IGetVideoHistoryDao
  extends Pick<GetRelatedVideoAndVideoHistory, 'videoId'> {
  clusterNumber: string;
  from?: string;
  to?: string;
}
export interface IGetLastVideoHistoryDao extends IGetVideoHistoryDao {}
export interface IGetListVideoHistoryDao extends IGetVideoHistoryDao {}

export class IGetVideoHistoryGetMultipleByIdDao {
  readonly videoIds: string[];

  readonly clusterNumber: string[];

  constructor(props: IGetVideoHistoryGetMultipleByIdDao) {
    this.clusterNumber = props.clusterNumber;
    this.videoIds = props.videoIds;
  }
}

/**
 * VideoHistoryGetMultipleByIdV2Adapter
 */
export class GetVideoHistoryMultipleByIdV2Dao {
  videoIds: Record<string, string[]>;
  from: string;
  to: string;

  constructor(props: {
    videoIds: Record<string, VideoCacheReturnType[]>;
    to: string;
    from: string;
  }) {
    const { adjustedTo, adjustedFrom } = DateUtil.adjustDates(
      props.to,
      props.from,
    );
    this.videoIds = RedisResultMapper.createVideoIds(props.videoIds);
    this.to = adjustedTo;
    this.from = adjustedFrom;
  }
}
export class GetChannelHistoryByChannelIdV2Dao {
  channelIds: string[];
  from?: string;
  to?: string;

  constructor(props: {
    channelIds: VideosMultiRelatedWordsCacheType | VideoCacheReturnType[];
    from?: string;
    to?: string;
  }) {
    this.channelIds = !Array.isArray(props.channelIds)
      ? RedisResultMapper.createChannelIds(props.channelIds)
      : props.channelIds.map((e) => e.channelId);
    this.from = props.from;
    this.to = props.to;
  }
}
export class RecentVideoHistoryDao extends GetRankingRelatedWordsDto {
  relatedWord: string;

  constructor(props: { search: string; relatedWord: string }) {
    super(props);
    this.relatedWord = props.relatedWord;
  }
}

export class RangeVideoHistoryDao extends GetAnalysisHitsDto {
  constructor(props: GetAnalysisHitsDto) {
    super(props);
    Object.assign(this, props);
  }
}
