import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
  IVideo,
} from '@Apps/modules/video/interface/find-many-video.interface';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { FindVideoPageV2Query } from '@Apps/modules/video/queries/v2/find-video-paging/find-video-paging.req.dto';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';

export interface VideoOutboundPort {
  findManyVideo(tag: string): Promise<string[]>;

  findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes>;

  findVideoMultiIndexPaging(arg: FindVideoPageV2Query): Promise<IPagingRes>;

  findVideoByWords(words: FindVideoQuery): Promise<IFindManyVideoResult[]>;

  findVideoIdFullScanAndVideos<T>(
    query: FindVideoDateQuery,
  ): Promise<T[] | ScrollApiError>;

  findVideosWithLastVideoHistory<T>(
    arg: FindVideoDateQuery,
  ): Promise<T[] | ScrollApiError>;

  findVideoInfo(clusterNumber: string, id: string): Promise<IdocRes<IVideo>>;
}
