import { IFindVideoPageV1Dto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { FindVideoDateQuery } from '@Apps/modules/video/application/dtos/find-videos.dtos';

import {
  IFindManyVideoResult,
  IPagingRes,
  IVideo,
} from '@Apps/modules/video/application/dtos/find-many-video.interface';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';

import {
  FindDailyViewsV3Dao,
  FindVideosDao,
} from '@Apps/modules/video/infrastructure/daos/video.dao';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { SearchRelationVideoDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';

export interface VideoQueryHandlerOutboundPort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoPaging(arg: IFindVideoPageDao): Promise<IPagingRes>;

  findVideoMultiIndexPaging(arg: any): Promise<IPagingRes>;

  findVideoByWords(
    words: SearchRelationVideoDao,
  ): Promise<IFindManyVideoResult[]>;

  findVideoIdFullScanAndVideos<T>(
    query: FindDailyViewsV3Dao,
  ): Promise<T[] | ScrollApiError>;

  findVideosWithLastVideoHistory<T>(
    arg: FindVideoDateQuery,
  ): Promise<T[] | ScrollApiError>;

  findVideoInfo(clusterNumber: string, id: string): Promise<IdocRes<IVideo>>;

  findRelatedVideoIdAndChannelIdFullScan(arg: FindVideosDao): Promise<any>;
}

export class IFindVideoPageDao extends IFindVideoPageV1Dto {}
