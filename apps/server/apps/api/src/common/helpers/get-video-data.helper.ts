import { Ok, Err, Result } from 'oxide.ts';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  GetChannelHistoryByChannelIdV2Dao,
  GetVideoHistoryMultipleByIdV2Dao,
} from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { ChannelHistoryByChannelIdOutboundPort } from '@Apps/modules/channel-history/domain/ports/channel-history.outbound.port';
import { VideoDataMapper } from '@Apps/modules/video/application/mapper/video-data.mapper';
import { GetRelatedVideoAndVideoHistoryPickChannelAverageViews } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { ComplexQueryException, TableNotFoundException } from '@Libs/commons';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

/**
 * 키워드 정보를 가져오는 공통 메소드
 * @param relWordsRepository - 키워드 정보를 조회할 저장소 인스턴스
 * @param search - 검색어
 * @returns 키워드 클러스터 배열 또는 에러
 */
export async function fetchKeywordClusters(
  relWordsRepository: RelatedWordsRepositoryPort,
  search: string,
): Promise<Result<string[] | null, any>> {
  const keywordInfo = await relWordsRepository.findOneByKeyword(search);
  let relatedCluster: string[] | null;
  if (keywordInfo.isErr()) {
    relatedCluster = null;
  } else {
    const keywordInfoUnwrap = keywordInfo.unwrap();
    relatedCluster = keywordInfoUnwrap.cluster.split(',').map((e) => e.trim());
  }
  return Ok(relatedCluster);
}

export class VideoDataServiceHelper {
  constructor(
    private readonly relWordsRepository: RelatedWordsRepositoryPort,
    private readonly videoCacheService: VideoCacheOutboundPorts,
    private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort,
    private readonly channelHistoryService: ChannelHistoryByChannelIdOutboundPort,
  ) {}

  async getKeywordClusters(
    search: string,
  ): Promise<Result<string[] | null, any>> {
    return fetchKeywordClusters(this.relWordsRepository, search);
  }

  async getVideoCacheAndHistories(
    relatedCluster: string[],
    dto,
  ): Promise<
    Result<
      GetRelatedVideoAndVideoHistoryPickChannelAverageViews[],
      | VideoNotFoundError
      | TableNotFoundException
      | ChannelHistoryNotFoundError
      | VideoHistoryNotFoundError
      | ComplexQueryException
    >
  > {
    const videoCacheDao = new GetVideoCacheDao({
      ...dto,
      relatedCluster,
    });

    const videoCacheResult = await this.videoCacheService.execute(
      videoCacheDao,
    );

    if (videoCacheResult.isOk()) {
      const videos = RedisResultMapper.groupByCluster(
        RedisResultMapper.toObjects(videoCacheResult.unwrap()),
      );
      if (!Object.values(videos).flat().length) {
        return Err(new VideoNotFoundError());
      }

      const videoHistoryDao = new GetVideoHistoryMultipleByIdV2Dao({
        videoIds: videos,
        from: videoCacheDao.from,
        to: videoCacheDao.to,
      });

      const channelHistoryDao = new GetChannelHistoryByChannelIdV2Dao({
        channelIds: videos,
        from: videoCacheDao.from,
        to: videoCacheDao.to,
      });

      const [videoHistoryResult, channelHistoryResult] = await Promise.all([
        this.videoHistoryService.execute(videoHistoryDao),
        this.channelHistoryService.execute(channelHistoryDao),
      ]);

      if (videoHistoryResult.isOk() && channelHistoryResult.isOk()) {
        const mergedVideoHistory = VideoDataMapper.mergeVideoData(
          videos,
          videoHistoryResult.unwrap(),
          channelHistoryResult.unwrap(),
        );

        return Ok(mergedVideoHistory);
      }
      if (videoHistoryResult.isErr()) {
        return Err(videoHistoryResult.unwrapErr());
      }
      return Err(channelHistoryResult.unwrapErr());
    }
    return Err(videoCacheResult.unwrapErr());
  }
}
export class KeywordServiceHelper {
  constructor(
    private readonly relWordsRepository: RelatedWordsRepositoryPort,
  ) {}

  async getClusters(search: string): Promise<Result<string[] | null, any>> {
    return fetchKeywordClusters(this.relWordsRepository, search);
  }
}
