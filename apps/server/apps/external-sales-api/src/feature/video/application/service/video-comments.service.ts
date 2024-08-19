import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VideoCommentsDto } from '@ExternalApps/feature/video/application/dto/video-comments.dto';
import { VideoToObject } from '@ExternalApps/feature/video/application/helpers/video.mapper';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  TVideoCommentRes,
  VideoCommentRes,
  YouTubeCommentThreadListResponse,
} from '@ExternalApps/feature/video/domain/port/video-comment.inbound.port';
import { lastValueFrom } from 'rxjs';
import { Ok } from 'oxide.ts';

@QueryHandler(VideoCommentsDto)
export class VideoCommentsService
  implements IQueryHandler<VideoCommentsDto, TVideoCommentRes>
{
  constructor(
    private readonly httpService: HttpService,

    private readonly configService: ConfigService,
  ) {}

  async execute(query: VideoCommentsDto): Promise<TVideoCommentRes> {
    const videoId = VideoToObject.extractVideoId(query.videoUrl);
    const googleApiKey = this.configService.get<string>('app.GOOGLE_APIKEY');

    const maxResults = query.maxResults
      ? `&maxResults=${query.maxResults}`
      : '';
    const replies = Number(query.replies) ? '&part=replies' : '';
    const order = !Number(query.order) ? '&order=time' : '&order=relevance';
    const pageToken = query.pageToken ? `&pageToken=${query.pageToken}` : '';
    const apiUrl =
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${googleApiKey}&textFormat=plainText&videoId=${videoId}&part=id&part=snippet` +
      replies +
      order +
      pageToken +
      maxResults;

    try {
      const response =
        this.httpService.get<YouTubeCommentThreadListResponse>(apiUrl);

      const resp = await lastValueFrom(response);

      if (resp.status == 200) {
        const data = resp.data;
        const { pageInfo, nextPageToken, items } = data;

        const result: VideoCommentRes = {
          pageInfo,
          nextPageToken,
          type: 'youtube', // 여기서 타입을 리터럴로 설정
          items,
        };
        return Ok(result);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
