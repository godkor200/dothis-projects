import { FindCategoryIssueVideoDto } from '@Apps/modules/video/application/dtos/find-category-issue-video.dto';
import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export interface VideoCategoryRes {
  /**
   * 채널 이름
   */
  channel_name: string;

  /**
   * 비디오 제목
   */
  video_title: string;

  /**
   * 비디오가 게시된 날짜 (ISO 8601 형식으로 가정)
   */
  video_published: string;

  /**
   * 비디오 조회수
   */
  video_views: number;

  /**
   * 비디오 클러스터 번호
   */
  video_cluster: number;

  /**
   * 비디오 식별자
   */
  video_id: string;

  /**
   * 일평균 조회수
   */
  avgViews: number;
}

export type VideoCategoryResult = Result<
  VideoCategoryRes[],
  VideoHistoryNotFoundError
>;

export interface VideoCategoryOutboundPort {
  execute(dao: FindCategoryIssueVideoDto): Promise<VideoCategoryResult>;
}
