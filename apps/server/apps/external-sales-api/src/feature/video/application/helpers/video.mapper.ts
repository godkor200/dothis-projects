import { getApiResponse } from '@ExternalApps/feature/preview/application/dto/preview.response.type';
import { TVideoVideoResponse } from '@dothis/dto';
import { ICrawledVideoRepositoryRes } from '@ExternalApps/feature/crawler/domain/port/crawled-video.repository.port';
import { TPreviewVideoOmitRes } from '@ExternalApps/feature/preview/domain/port/preview-video.inbound.port';

export class VideoToObject {
  /**
   * Video URL에서 Video ID를 추출하는 함수.
   * 기존 YouTube URL 형식과 shorts 형식을 모두 지원합니다.
   */
  static extractVideoId(url: string): string | null {
    const regex =
      /(?:\?v=|&v=|youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  private static createVideoResponse(
    video_id: string,
    video_title: string,
    video_description: string,
    video_tags: string,
    video_views: number,
    video_likes: number,
    video_comments: number,
    channel_subscribers: number,
    video_category: string,
    video_duration: number,
    CHANNEL_THUMBNAIL: string,
    CHANNEL_NAME: string,
    CHANNEL_ID: string,
    video_published: string,
    crawled_date: string,
  ): TPreviewVideoOmitRes {
    return {
      videoUrl: `https://www.youtube.com/shorts/${video_id}`,
      videoId: video_id,
      type: 'youtube',
      title: video_title,
      desc: video_description,
      tags: this.tagFilter(video_tags),
      counter: {
        joinCount: video_views,
        likeCount: video_likes,
        commentCount: video_comments,
        subscribeCount: channel_subscribers,
      },
      categories: video_category,
      duration: video_duration,
      thumbnailUrl: `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`,
      creators: {
        name: CHANNEL_NAME,
        channelId: CHANNEL_ID,
        profileUrl: CHANNEL_THUMBNAIL,
      },
      uploadAt: video_published,
      updatedAt: crawled_date,
      isDel: false,
    };
  }

  static mapApiResponseData(data: getApiResponse): TPreviewVideoOmitRes {
    const { input_data, data: nestedData, crawled_date } = data;
    const { video_data, channel_data } = nestedData;

    return this.createVideoResponse(
      input_data.video_id,
      video_data.video_title,
      video_data.video_description,
      video_data.video_tags,
      video_data.video_views,
      video_data.video_likes,
      video_data.video_comments,
      channel_data.channel_subscribers,
      video_data.video_category,
      video_data.video_duration,
      channel_data.channel_thumbnail,
      channel_data.channel_name,
      channel_data.channel_id,
      video_data.video_published,
      crawled_date,
    );
  }

  static mapCrawledData(
    data: ICrawledVideoRepositoryRes,
  ): TPreviewVideoOmitRes {
    return this.createVideoResponse(
      data.video_id,
      data.video_title,
      data.video_description,
      data.video_tags,
      data.video_views,
      data.video_likes,
      data.video_comments,
      data.channel_subscribers,
      data.video_category,
      data.video_duration,
      data.CHANNEL_THUMBNAIL,
      data.CHANNEL_NAME,
      data.CHANNEL_ID,
      data.video_published,
      data.crawled_date,
    );
  }

  static tagFilter(tags: string) {
    if (tags === '[]' || tags === "['']") {
      return [];
    }
    return tags.slice(2, -2).split("', '");
  }
}
