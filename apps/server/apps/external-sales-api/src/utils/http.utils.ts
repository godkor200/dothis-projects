import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { fetchDataApiResponse } from '@ExternalApps/feature/preview/application/dto/preview.response.type';
import { lastValueFrom } from 'rxjs';
import { Err, Ok, Result } from 'oxide.ts';
import { YoutubeChannelServerErrorException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
export type THttpUtilsHttpResponse = Result<
  fetchDataApiResponse,
  YoutubeChannelServerErrorException
>;
@Injectable()
export class HttpUtils {
  constructor(private readonly httpService: HttpService) {}
  private readonly apiUrl = 'http://dothis2.iptime.org:8002/video-channel-info';
  //'https://vc2nqcxgphxrixcizq2jfqdsei0mytqt.lambda-url.ap-northeast-2.on.aws/video_channel_info'; // 실제 API 엔드포인트로 변경 필요
  async fetchData(videoId: string): Promise<THttpUtilsHttpResponse> {
    const response = await lastValueFrom(
      this.httpService.get<fetchDataApiResponse>(this.apiUrl + '/' + videoId),
    );
    if (response.data.code === 200) {
      return Ok(response.data);
    } else {
      return Err(new YoutubeChannelServerErrorException());
    }
  }
}
