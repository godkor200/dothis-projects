import { FindAccumulateQuery } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { FindAdsInfoDto } from '@Apps/modules/video/application/dtos/find-ads-info.dtos';
import { FindAdsTopHitsDto } from '@Apps/modules/video/application/dtos/find-ads-top-hits.dto';
import { GetAnalysisHitsQuery } from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
export class GetVideoDao extends GetVideoPaginatedPageDto {
  constructor(props: GetVideoDao) {
    super(props);
    this.clusterNumber = props.clusterNumber;
  }
}
export class FindDailyViewsV3Dao extends FindDailyViewsV3Dto {
  constructor(props: FindDailyViewsV3Dao) {
    super(props);
    Object.assign(this, props);
  }
}

export class FindIndividualVideoInfoV1Dao extends FindIndividualVideoInfoV1Dto {
  constructor(props: FindIndividualVideoInfoV1Dto) {
    super(props);
    Object.assign(this, props);
  }
}

export type GetRelatedVideoHistory = GetRelatedVideoAndVideoHistory;
interface IRelated {
  readonly relatedWord: string;
  readonly relatedCluster: string[];
}

export class GetRelatedLastVideoAndVideoHistoryEach
  extends GetRankingRelatedWordsDto
  implements IRelated
{
  public readonly relatedWord: string;
  public readonly relatedCluster: string[];
  constructor(props: GetRelatedLastVideoAndVideoHistoryEach) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetRelatedLastVideoAndVideoHistory extends GetRankingRelatedWordsDto {
  public readonly relatedWords: string[];
  public readonly relatedCluster: string[];
  constructor(props: GetRelatedLastVideoAndVideoHistory) {
    super(props);
    Object.assign(this, props);
  }
}

export class GetAdsInfoResDao extends FindAdsInfoDto {
  public readonly relatedCluster: string[];

  constructor(props: FindAdsInfoDto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? props.clusterNumber.split(',')
      : props.clusterNumber;
    this.relatedCluster = propsClusterNumber;
  }
}
export class GetVideoAdsTopHitsDao extends FindAdsTopHitsDto {
  public readonly relatedCluster: string[];

  constructor(props: FindAdsTopHitsDto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.relatedCluster = propsClusterNumber;
  }
}
export class GetVideoAndChannelViewsByDateAndKeywordsDao extends GetVideoAdsTopHitsDao {
  constructor(props: GetVideoAndChannelViewsByDateAndKeywordsDao) {
    super(props);
  }
}

export class GetVideoCacheDao extends GetAnalysisHitsQuery {
  public relatedCluster: string[];

  constructor(props: GetVideoCacheDao) {
    super(props);

    this.relatedCluster = props.relatedCluster ?? null;
    Object.assign(this, props);
  }
}
export class GetVideosMultiRelatedWordsCacheDao {
  public words: string[];
  public relatedCluster: string[];
  constructor(props: GetVideosMultiRelatedWordsCacheDao) {
    this.words = props.words;
    this.relatedCluster = props.relatedCluster ?? null;
  }
}
export class GetVideoMultiKeywordCacheDao {
  constructor(
    public search: string,
    public related?: string,
  ) {}
}
