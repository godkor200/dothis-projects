import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { getApiResponse } from '@ExternalApps/feature/preview/application/dto/preview.response.type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpUtils {
  constructor(private readonly httpService: HttpService) {}
  private readonly apiUrl =
    'https://vc2nqcxgphxrixcizq2jfqdsei0mytqt.lambda-url.ap-northeast-2.on.aws/video_channel_info'; // 실제 API 엔드포인트로 변경 필요

  async fetchData(videoId: string): Promise<getApiResponse> {
    const response = await lastValueFrom(
      this.httpService.post<getApiResponse>(this.apiUrl, {
        video_id: videoId,
      }),
    );
    return response.data;
  }
}
