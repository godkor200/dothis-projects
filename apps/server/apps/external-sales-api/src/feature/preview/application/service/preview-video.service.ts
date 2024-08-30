import {
  PreviewVideoDto,
  TPreviewVideoRes,
} from '@ExternalApps/feature/preview/domain/port/preview-video.inbound.port';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok } from 'oxide.ts';
import { VideoToObject } from '@ExternalApps/feature/video/application/helpers/video.mapper';
import { InvalidYoutubeUrlException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { HttpUtils } from '@ExternalApps/utils/http.utils';

@QueryHandler(PreviewVideoDto)
export class PreviewVideoService
  implements IQueryHandler<PreviewVideoDto, TPreviewVideoRes>
{
  constructor(private readonly httpUtils: HttpUtils) {}

  async execute(dto: PreviewVideoDto): Promise<TPreviewVideoRes> {
    try {
      // 현재 한국 시간 설정
      const videoId = VideoToObject.extractVideoId(dto.videoUrl);
      if (!videoId) return Err(new InvalidYoutubeUrlException());

      // 외부 API로 HTTP GET 요청을 보내고 JSON 응답을 받아옵니다.
      const responseData = await this.httpUtils.fetchData(videoId);
      const mappedData = VideoToObject.mapApiResponseData(responseData);

      return Ok({ ...mappedData });
    } catch (error) {
      return Err(error);
    }
  }
}
