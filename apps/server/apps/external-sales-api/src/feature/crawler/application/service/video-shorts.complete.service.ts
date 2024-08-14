import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteVideoShortsDto } from '@ExternalApps/feature/crawler/application/dto/complete.dto';
import { CompleteVideoShortsResponse } from '@ExternalApps/feature/crawler/domain/port/video-shorts.complete.inbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import {
  ICrawledVideoRepositoryPort,
  ICrawledVideoRepositoryRes,
} from '@ExternalApps/feature/crawler/domain/port/crawled-video.repository.port';
import { Inject } from '@nestjs/common';
import { CRAWLED_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/video/video-data.di-token.constants';
import { REQUEST_VIDEO_REPOSITORY_DI_TOKEN } from '@ExternalApps/feature/crawl-queue/video/video.di-token.constants';
import { ReqVideoOutboundPort } from '@ExternalApps/feature/crawl-queue/video/domain/port/post-req-video.outbound.port';
import { TVideoVideoResponse } from '@dothis/dto';
import { VideoToObject } from '@ExternalApps/feature/video/application/helpers/video.mapper';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { RequestVideoEntity } from '@ExternalApps/feature/crawl-queue/video/domain/entities/request-video.entity';
import { lastValueFrom } from 'rxjs';
import {
  WebhookResponseFailedException,
  FailureDetail,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/webhook-response-failed.exception';

interface IncrementResult {
  views_increment: number;
  likes_increment: number;
  comments_increment: number;
  subscribers_increment: number;
}

@CommandHandler(CompleteVideoShortsDto)
export class VideoShortsCompleteService
  implements
    ICommandHandler<CompleteVideoShortsDto, CompleteVideoShortsResponse>
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,

    @Inject(CRAWLED_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly crawledVideoRepository: ICrawledVideoRepositoryPort,

    @Inject(REQUEST_VIDEO_REPOSITORY_DI_TOKEN)
    private readonly requestVideoRepository: ReqVideoOutboundPort,
  ) {}

  private mergeCalculatedWithResponses(
    calculated: Record<string, IncrementResult>,
    responses: TVideoVideoResponse[],
  ): TVideoVideoResponse[] {
    return responses.map((response) => ({
      ...response,
      Stats: {
        joinCount: calculated[response.videoId]?.views_increment || 0,
        likeCount: calculated[response.videoId]?.likes_increment || 0,
        commentCount: calculated[response.videoId]?.comments_increment || 0,
        subscribeCount:
          calculated[response.videoId]?.subscribers_increment || 0,
      },
    }));
  }

  private calculateIncrements(
    data: ICrawledVideoRepositoryRes[],
    day: number,
  ): Record<string, IncrementResult> {
    const incrementResults: Record<string, IncrementResult> = {};

    // 오늘과 어제 데이터를 가져오기
    const todayData = data.filter((video) => video.day === day);
    const yesterdayData = data.filter((video) => video.day !== day);

    // 오늘 데이터 계산
    todayData.forEach((video) => {
      if (!incrementResults[video.video_id]) {
        incrementResults[video.video_id] = {
          views_increment: 0,
          likes_increment: 0,
          comments_increment: 0,
          subscribers_increment: 0,
        };
      }

      // 오늘의 데이터는 그대로 저장
      incrementResults[video.video_id].views_increment += video.video_views;
      incrementResults[video.video_id].likes_increment += video.video_likes;
      incrementResults[video.video_id].comments_increment +=
        video.video_comments;
      incrementResults[video.video_id].subscribers_increment += Number(
        video.channel_subscribers,
      );
    });

    // 어제 데이터에서 빼기
    yesterdayData.forEach((video) => {
      // 어제 데이터가 있는 경우에는 앞에서 할당한 값을 빼는 작업
      if (incrementResults[video.video_id]) {
        incrementResults[video.video_id].views_increment -= video.video_views;
        incrementResults[video.video_id].likes_increment -= video.video_likes;
        incrementResults[video.video_id].comments_increment -=
          video.video_comments;
        incrementResults[video.video_id].subscribers_increment -= Number(
          video.channel_subscribers,
        );
      }
    });

    return incrementResults;
  }

  private groupByWebhookUrl(
    preFetch: RequestVideoEntity[],
  ): Record<string, { token: string; requests: RequestVideoEntity[] }> {
    return preFetch.reduce((acc, item) => {
      const { webhookUrl, token } = item;
      if (!acc[webhookUrl]) {
        acc[webhookUrl] = { token, requests: [] }; // token과 함께 requests 배열 생성
      }
      acc[webhookUrl].requests.push(item);
      return acc;
    }, {} as Record<string, { token: string; requests: RequestVideoEntity[] }>);
  }

  async execute(
    command: CompleteVideoShortsDto,
  ): Promise<CompleteVideoShortsResponse> {
    const defaultApiUrl =
      this.configService.get('app.SQUADX_API_URL') +
      '/v1/webhooks/youtube_shorts';
    const defaultToken = this.configService.get('app.SQUADX_API_TOKEN');

    try {
      const preFetch = await this.requestVideoRepository.findAll();
      if (!preFetch.length) return Err(new VideoNotFoundException());

      const groupedByWebhookUrl = this.groupByWebhookUrl(preFetch);
      const time = new Date(command.crawledAt);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();

      const failureDetails: FailureDetail[] = [];

      const promises = Object.entries(groupedByWebhookUrl).map(
        async ([webhookUrl, { token, requests }], index) => {
          const videoIds = requests.map((e) => e.videoId);

          try {
            const crawledVideoRepositoryRes =
              await this.crawledVideoRepository.get({
                videoIds,
                year,
                month, // getMonth() is 0-based
                day,
              });

            if (!crawledVideoRepositoryRes.isOk()) {
              throw crawledVideoRepositoryRes.unwrapErr();
            }

            const resUnwrap = crawledVideoRepositoryRes.unwrap();

            const calculated = this.calculateIncrements(resUnwrap, day);

            // 중복 제거 및 응답 맵핑
            const formattedResponse: TVideoVideoResponse[] = Array.from(
              new Map(
                resUnwrap.map((video: ICrawledVideoRepositoryRes) => {
                  const matchingVideo = requests.find(
                    (e) => e.videoId === video.video_id,
                  );
                  return [
                    video.video_id,
                    {
                      ...VideoToObject.mapCrawledData(video),
                      clientId: matchingVideo?.usersClientId ?? '',
                      vodId: matchingVideo?.vodId ?? '',
                      shortformId: matchingVideo?.shortformId ?? '',
                      managerId: matchingVideo?.managerId ?? '',
                      operatorId: matchingVideo?.operatorId ?? '',
                    },
                  ];
                }),
              ).values(),
            );

            const result = this.mergeCalculatedWithResponses(
              calculated,
              formattedResponse,
            );
            console.log(result);
            const response = await lastValueFrom(
              this.httpService.post(webhookUrl, result, {
                headers: {
                  Authorization: `Bearer ${token || defaultToken}`, // 가져온 토큰 사용
                },
              }),
            );

            console.log(`Request ${index + 1}: Successful`, response.data);
            return Ok(true);
          } catch (error) {
            console.error(
              `Request ${
                index + 1
              }: Failed, Token: ${token}, URL: ${webhookUrl}`,
              error.response?.data || error.message,
            );
            console.error(`Request ${index + 1} Error Details:`, error.config);
            // 실패한 이유 기록
            failureDetails.push({
              requestIndex: index + 1,
              webhookUrl,
              token,
              message: error.response?.data || error.message,
            });
            return Err(error);
          }
        },
      );

      const results: Array<Result<unknown, any>> = await Promise.all(promises);
      const allSucceeded = results.every((result) => result.isOk());

      if (allSucceeded) {
        return Ok(true);
      } else {
        return Err(new WebhookResponseFailedException(failureDetails));
      }
    } catch (err) {
      console.error('Error in execute method:', err);
      return Err(err);
    }
  }
}
