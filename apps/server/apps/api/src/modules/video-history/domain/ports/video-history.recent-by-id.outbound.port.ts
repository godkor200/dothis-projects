import { VideoSource } from '@Apps/modules/video/application/dtos/find-accumulate-videos.interface';
import { Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export interface VideoHistoryRespType {
  video_published: string; // 날짜 및 시간 정보로 ISO 8601 문자열인 것으로 보입니다.
  channel_subscribers: number; // 구독자 수
  video_likes: number; // 좋아요 수
  '@timestamp': string; // 타임스탬프, ISO 8601 형식의 문자열로 보입니다.
  use_text: string[]; // 키워드나 태그로 보이는 문자열 배열
  year_c: string; // 연도 정보
  channel_total_videos: number; // 총 비디오 수
  day_c: string; // 일자 정보
  video_views: number; // 조회수
  video_duration: number; // 비디오 길이 (초 단위)
  video_id: string; // 비디오 ID
  month_c: string; // 월 정보
  channel_name: string; // 채널명
  video_title: string; // 비디오 제목
  video_performance: number; // 비디오 성능 지표
  '@version': string; // 버전 정보
  video_cluster: number; // 비디오 클러스터
  video_comments: number; // 댓글 수
  channel_id: string; // 채널 ID
  channel_total_views: number; // 총 조회수
  channel_average_views: number; // 평균 조회수
}

export type TVideoHistoryResult = Result<
  VideoHistoryRespType[],
  VideoHistoryNotFoundError
>;

export interface VideoHistoryRecentByIdOutboundPort {
  execute(videoIds: string[]): Promise<TVideoHistoryResult>;
}
