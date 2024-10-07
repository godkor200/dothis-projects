export interface VideoHistoryDataResp {
  month_c: string; // 월을 나타내는 문자열
  channel_total_views: number; // 채널의 총 조회수
  video_id: string; // 비디오 ID
  video_comments: number; // 비디오의 댓글 수
  video_title: string; // 비디오 제목
  video_duration: number; // 비디오의 길이(초 단위)
  video_views: number; // 비디오 조회수
  channel_total_videos: number; // 채널의 전체 비디오 수
  video_published: string; // 비디오가 게시된 날짜(ISO 8601 형식)
  video_performance: number; // 비디오 성과 지수
  '@version': string; // 버전 정보
  channel_subscribers: number; // 채널 구독자 수
  video_likes: number; // 비디오의 좋아요 수
  year_c: string; // 연도를 나타내는 문자열
  channel_name: string; // 채널 이름
  day_c: string; // 일을 나타내는 문자열
  video_cluster: number; // 비디오 클러스터 ID
  use_text: string[]; // 사용된 텍스트 배열
  channel_id: string; // 채널 ID
  channel_average_views: number; // 채널의 평균 조회수
  '@timestamp': string; // 타임스탬프(ISO 8601 형식)
}

export class VideoListByChannelIdDao {
  public channelId: string; // 필수 필드
  public from?: string; // 선택 필드
  public search?: string; // 선택 필드
  public sort: string; // 선택 필드 (기본값 있음)
  public order: string; // 선택 필드 (기본값 있음)

  constructor(
    channelId: string,
    from?: string,
    search?: string,
    sort: string = 'video_published',
    order: string = 'asc',
  ) {
    this.channelId = channelId;
    this.from = from;
    this.search = search;
    this.sort = sort;
    this.order = order;
  }
}
