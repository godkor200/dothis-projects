import { VideoHistoryCategoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.category.dao';
import {
  IIndicesServerResponse,
  SearchResponseBody,
} from '@Apps/common/opensearch/interface/os.res.interface';
import { Result } from 'oxide.ts';

type VideoClusterBucket = {
  key: number;
  doc_count: number;
};

interface VideoClustersAggregation {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: VideoClusterBucket[];
}

// Aggregations과 응답 바디 구조 통합
export interface Aggregations {
  video_clusters?: VideoClustersAggregation;
}
export type VideoSearchResponse<T> = IIndicesServerResponse<
  SearchResponseBody<T>
>;

export type TResultCategory = { cluster: number; count: number };

export type TVideoHistoryCategoryResult = Result<TResultCategory[], any>;

export interface VideoHistoryCategoryOutbound {
  execute(dao: VideoHistoryCategoryDao): Promise<TVideoHistoryCategoryResult>;
}
