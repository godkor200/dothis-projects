import { Inject } from '@nestjs/common';
import {
  VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN,
  VIDEO_PAGINATED_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import {
  IGetRelatedVideosEntireCountOutBoundPort,
  IGetRelatedVideosPaginatedOutBoundPort,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoPaginatedPageDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';
import { GetVideoDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { GetVideoDataPageServiceInboundPort } from '@Apps/modules/video/domain/ports/get-video-data-page.service.inbound.port';
import { Err, Ok } from 'oxide.ts';
import { IGetVideoHistoryGetMultipleByIdOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';

export class GetVideoDataPageService
  implements GetVideoDataPageServiceInboundPort
{
  constructor(
    @Inject(VIDEO_PAGINATED_IGNITE_DI_TOKEN)
    private readonly getRelatedVideosPaginated: IGetRelatedVideosPaginatedOutBoundPort,

    @Inject(VIDEO_HISTORY_GET_HISTORY_MULTIPLE_HIT_IGNITE_DI_TOKEN)
    private readonly getRelatedVideoHit: IGetVideoHistoryGetMultipleByIdOutboundPort,

    @Inject(VIDEO_ENTIRE_COUNT_IGNITE_DI_TOKEN)
    private readonly getRelatedVideosEntireCount: IGetRelatedVideosEntireCountOutBoundPort,
  ) {}

  async execute(dto: GetVideoPaginatedPageDto): Promise<TGetVideoPage> {
    const dao = new GetVideoDao(dto);
    const entireCount = await this.getRelatedVideosEntireCount.execute(dao);
    const data = await this.getRelatedVideosPaginated.execute(dao);

    if (data.isOk() && entireCount.isOk()) {
      const total = entireCount
        .unwrap()
        .reduce(
          (acc, numberArray) => acc + Number(numberArray.map((count) => count)),
          0,
        );

      const videoIds = data.unwrap().map((d) => d.videoId);
      const res = await this.getRelatedVideoHit.execute({
        videoIds,
        clusterNumber: dto.clusterNumber,
      });

      let latestData = {};
      if (res.isOk()) {
        res.unwrap().forEach((data) => {
          if (
            !latestData[data.videoId] ||
            latestData[data.videoId].day < data.day
          ) {
            latestData[data.videoId] = data;
          }
        });
      }
      // data.unwrap() 배열을 업데이트하기 위해 map 함수를 사용합니다.
      const updatedData = data.unwrap().map((videoData) => {
        // latestData 객체에서 현재 videoId에 해당하는 조회 데이터를 찾습니다.
        const hitData = latestData[videoData.videoId];
        // 조회 데이터가 존재한다면, videoViews를 해당 조회수로 업데이트합니다.

        if (hitData) {
          return { ...videoData, videoViews: hitData.videoViews }; // hitData.views는 예시입니다. 실제 속성명에 맞게 조정해야 합니다.
        }
        // 조회 데이터가 없다면, 기존 비디오 데이터를 그대로 반환합니다.
        return videoData;
      });

      return Ok({
        total,
        data: updatedData, // 업데이트된 데이터를 반환합니다.
      });
    } else {
      return Err(entireCount.unwrapErr() || data.unwrapErr());
    }
  }
}
