import { FindAccumulateQuery } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';
import { FindDailyViewsV3Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';
import { GetRankingRelatedWordsDto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';

export class FindVideosDao extends FindAccumulateQuery {
  readonly cluster: string;
  constructor(props: FindVideosDao) {
    super(props);
  }
}
export class GetVideoDao extends GetVideoPaginatedPageDto {}
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
export class GetRelatedVideoChannelHistoryDao
  extends ExpectedViewsV1Dto
  implements Pick<IRelated, 'relatedCluster'>
{
  public readonly relatedCluster: string[];
  constructor(props: ExpectedViewsV1Dto) {
    super(props);
    const propsClusterNumber = !Array.isArray(props.clusterNumber)
      ? [props.clusterNumber]
      : props.clusterNumber;
    this.search = props.search;
    this.related = props.related;
    this.from = props.from;
    this.to = props.to;
    this.relatedCluster = propsClusterNumber;
  }
}
