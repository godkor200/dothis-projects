import { PostReqVideoInboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.inbound.port';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { PostRequestVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/post-req-video.dto';
import { TPostRequestVideoRes } from '@ExternalApps/feature/crawl-queue/video/application/commands/post-req-video.command';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { Err, Ok } from 'oxide.ts';
import {
  DuplicateException,
  InvalidYoutubeUrlException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import {
  VIDEO_DATA_REPOSITORY_DI_TOKEN,
  VIDEO_HISTORY_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/video/video-data.di-token.constants';
import { VideoDataRepositoryPort } from '@ExternalApps/feature/video/domain/port/video.outbound.port';
import {
  CHANNEL_DATA_REPOSITORY_DI_TOKEN,
  CHANNEL_HISTORY_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/channel/channel-data.di-token.constants';
import { ChannelDataRepositoryPort } from '@ExternalApps/feature/channel/domain/port/channel-data.repository.port';
import { VideoHistoryOutboundPort } from '@ExternalApps/feature/video/domain/port/video-history.outbound.port';
import { ChannelHistoryRepositoryPort } from '@ExternalApps/feature/channel/domain/port/channel-history.repository.port';
import { VideoToObject } from '@ExternalApps/feature/video/application/helpers/video.mapper';
import { WebhookUrlTokenMismatchException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/webhook-response-failed.exception';
import { HttpUtils } from '@ExternalApps/utils/http.utils';

export class PostReqVideoService implements PostReqVideoInboundPort {
  constructor(
    private readonly httpUtils: HttpUtils,

    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,

    @Inject(VIDEO_DATA_REPOSITORY_DI_TOKEN)
    private readonly videoRepository: VideoDataRepositoryPort,

    @Inject(CHANNEL_DATA_REPOSITORY_DI_TOKEN)
    private readonly channelDataRepository: ChannelDataRepositoryPort,

    @Inject(VIDEO_HISTORY_REPOSITORY_DI_TOKEN)
    private readonly videoHistoryRepository: VideoHistoryOutboundPort,

    @Inject(CHANNEL_HISTORY_REPOSITORY_DI_TOKEN)
    private readonly channelHistoryRepository: ChannelHistoryRepositoryPort,
  ) {}

  async execute(command: PostRequestVideoDto): Promise<TPostRequestVideoRes> {
    try {
      const now = new Date();
      const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 (한국 시간)
      const year = koreaTime.getFullYear();
      const month = koreaTime.getMonth() + 1; // getMonth()는 0부터 시작합니다.
      const day = koreaTime.getDate();
      const videoId = VideoToObject.extractVideoId(command.videoUrl);
      const webhookUrl = command.webhookUrl;
      const token = command.token;
      const webhookUrlMatch =
        await this.requestVideoRepository.findOneByWebHookUrlAndMatchToken(
          webhookUrl,
          token,
        );

      if (webhookUrlMatch === false) {
        return Err(new WebhookUrlTokenMismatchException());
      }
      if (!videoId) return Err(new InvalidYoutubeUrlException());
      const res = await this.requestVideoRepository.insert({
        userId: '1', //FIXME: 임시
        videoId: videoId,
        usersClientId: command.clientId,
        isShorts: 1,
        managerId: command.managerId,
        operatorId: command.operatorId,
        vodId: command.vodId,
        shortformId: command.shortformId,
        webhookUrl,
        updateDate: new Date(),
        token,
      });

      const response = await this.httpUtils.fetchData(videoId);
      const responseData = response;
      if (responseData.message === 'SUCCESS') {
        // 데이터를 원하는 형식으로 매핑
        const { video_data, channel_data } = response.data;
        const videoPublished = new Date(video_data.video_published);
        const monthPublished = videoPublished.getMonth() + 1;
        // 비디오 데이터 삽입 시도
        try {
          await this.videoRepository.insert({
            videoId: video_data.video_id,
            channelId: video_data.channel_id,
            videoTitle: video_data.video_title,
            videoDescription: video_data.video_description,
            videoTags: video_data.video_tags,
            videoDuration: video_data.video_duration,
            videoPublished,
            videoCategory: video_data.video_category,
            videoInfoCard: video_data.video_info_card,
            videoWithAds: video_data.video_with_ads,
            videoEndScreen: video_data.video_end_screen,
            videoCluster: video_data.video_cluster,
            year: videoPublished.getFullYear(),
            month: monthPublished,
            day: videoPublished.getDate(),
            crawledDate: koreaTime,
          });
        } catch (videoInsertError) {
          if (videoInsertError.code === 'ER_DUP_ENTRY') {
            console.warn('Duplicate entry found, skipping video insert.');
          } else {
            return Err(videoInsertError); // 다른 오류 발생 시 즉시 반환
          }
        }

        // 비디오 히스토리 삽입 시도
        try {
          await this.videoHistoryRepository.insert({
            video_id: video_data.video_id,
            channel_id: video_data.channel_id,
            video_cluster: video_data.video_cluster,
            video_comments: video_data.video_comments,
            video_views: video_data.video_views,
            video_likes: video_data.video_likes,
            video_performance: video_data.video_performance,
            year,
            month,
            day,
          });
        } catch (videoHistoryError) {
          if (videoHistoryError.code === 'ER_DUP_ENTRY') {
            console.warn(
              'Duplicate entry found, skipping video history insert.',
            );
          } else {
            return Err(videoHistoryError); // 다른 오류 발생 시 즉시 반환
          }
        }
        try {
          await this.channelDataRepository.insert({
            channelId: channel_data.channel_id,
            channelName: channel_data.channel_name,
            channelDescription: channel_data.channel_description,
            channelTags: channel_data.channel_tags,
            mainlyUsedKeywords: channel_data.mainly_used_keywords,
            mainlyUsedTags: channel_data.mainly_used_tags,
            channelCountry: channel_data.channel_country,
            channelLink: channel_data.channel_link,
            channelSince: channel_data.channel_since,
            channelCluster: channel_data.channel_cluster,
            channelThumbnail: channel_data.channel_thumbnail,
            channelIdPart: channel_data.channel_id[3],
          });
        } catch (channelDataError) {
          if (channelDataError.code === 'ER_DUP_ENTRY') {
            console.warn(
              'Duplicate entry found, skipping channel data insert.',
            );
          } else {
            return Err(channelDataError); // 다른 오류 발생 시 즉시 반환
          }
        }

        try {
          await this.channelHistoryRepository.insert({
            channel_id: channel_data.channel_id,
            channel_total_views: channel_data.channel_total_views,
            channel_subscribers: channel_data.channel_subscribers,
            channel_average_views: channel_data.channel_average_views,
            channel_total_videos: channel_data.channel_total_videos,
            year,
            month,
            day,
          });
        } catch (channelHistoryError) {
          if (channelHistoryError.code === 'ER_DUP_ENTRY') {
            console.warn(
              'Duplicate entry found, skipping channel data insert.',
            );
          } else {
            return Err(channelHistoryError); // 다른 오류 발생 시 즉시 반환
          }
        }
      }
      const mappedData = VideoToObject.mapApiResponseData(responseData);

      if (res.success) {
        return Ok({
          clientId: command.clientId,
          vodId: command.vodId,
          shortformId: command.shortformId,
          managerId: command.managerId,
          operatorId: command.operatorId,
          videoUrl: command.videoUrl,
          videoId: videoId,
          type: 'youtube',
          ...mappedData,
        });
      }
      return Err(new InternalServerErrorException());
    } catch (err) {
      if (err.message.includes('Duplicate')) {
        return Err(new DuplicateException(err.message));
      }
      return err;
    }
  }
}
