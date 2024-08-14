import {
    PreviewVideoDto,
    TPreviewVideoRes,
} from '@ExternalApps/feature/preview/domain/port/preview-video.inbound.port';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {Err, Ok} from 'oxide.ts';
import {HttpService} from '@nestjs/axios';
import {VideoToObject} from '@ExternalApps/feature/video/application/helpers/video.mapper';
import {InvalidYoutubeUrlException} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import {getApiResponse} from "@ExternalApps/feature/preview/application/dto/preview.response.type";
import {lastValueFrom} from "rxjs";


@QueryHandler(PreviewVideoDto)
export class PreviewVideoService
    implements IQueryHandler<PreviewVideoDto, TPreviewVideoRes> {
    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    async execute(dto: PreviewVideoDto): Promise<TPreviewVideoRes> {
        const apiUrl =
            'https://vc2nqcxgphxrixcizq2jfqdsei0mytqt.lambda-url.ap-northeast-2.on.aws/video_channel_info'; // 실제 API 엔드포인트로 변경 필요

        try {
            // 현재 한국 시간 설정
            const videoId = VideoToObject.extractVideoId(dto.videoUrl);
            if (!videoId) return Err(new InvalidYoutubeUrlException());

            // 외부 API로 HTTP GET 요청을 보내고 JSON 응답을 받아옵니다.
            const responseData = await lastValueFrom(this.httpService.get<getApiResponse>('http://dothis2.iptime.org:8002/video-channel-info/' + videoId))

            const mappedData = VideoToObject.mapApiResponseData(responseData.data);

            return Ok({...mappedData});
        } catch (error) {
            return Err(error);
        }
    }
}
