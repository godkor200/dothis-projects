import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { fetchDataApiResponse } from '@ExternalApps/feature/preview/application/dto/preview.response.type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpUtils {
  constructor(private readonly httpService: HttpService) {}
  private readonly apiUrl =
    'https://vc2nqcxgphxrixcizq2jfqdsei0mytqt.lambda-url.ap-northeast-2.on.aws/video_channel_info'; // 실제 API 엔드포인트로 변경 필요

  async fetchData(videoId: string): Promise<fetchDataApiResponse> {
    const response = await lastValueFrom(
      this.httpService.post<fetchDataApiResponse>(this.apiUrl, {
        video_id: videoId,
      }),
    );

    return response.data;
  }
}
