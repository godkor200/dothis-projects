import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { Inject } from '@nestjs/common';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { FindDailyViewsV2Dto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';
import { TFindDailyView } from '@Apps/modules/hits/application/queries/get-daily-hits.v1.query-handler';
import { Err, Ok } from 'oxide.ts';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { IGetVideoHistoryGetMultipleByIdV2OutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetVideoHistoryMultipleByIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { VideoAggregateHelper } from '@Apps/modules/video/application/service/helpers/video.aggregate.helper';
import { VideoAggregateUtils } from '@Apps/modules/video/application/service/helpers/video.aggregate.utils';

export class GetDailyHitsV2Service implements DailyHitsServiceInboundPort {
  constructor(
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,

    @Inject(VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN)
    private readonly videoHistoryService: IGetVideoHistoryGetMultipleByIdV2OutboundPort,
  ) {}
  async execute(props: FindDailyViewsV2Dto): Promise<TFindDailyView> {
    try {
      const VideoDao = new GetVideoCacheDao({
        search: props.search,
        related: props.related,
        from: props.from,
        to: props.to,
      });
      const videoCacheResult = await this.videoCacheService.execute(VideoDao);
      if (videoCacheResult.isOk()) {
        const videoCacheResultUnwrap = videoCacheResult.unwrap();

        const videoHistoryDao = new GetVideoHistoryMultipleByIdV2Dao({
          videoIds: videoCacheResultUnwrap,
          from: VideoDao.from,
          to: VideoDao.to,
        });

        const videoHistoryResult = await this.videoHistoryService.execute(
          videoHistoryDao,
        );
        if (videoHistoryResult.isOk()) {
          const videoHistoryResultUnwrap = videoHistoryResult.unwrap();
          const res = VideoAggregateHelper.calculateIncreaseByIgnite(
            videoHistoryResultUnwrap,
          );
          return Ok({
            success: true,
            data: VideoAggregateUtils.generateDailyFakeViews(
              props.from,
              props.to,
              res,
            ),
          });
        }
        return Err(videoHistoryResult.unwrapErr());
      }
      return Err(videoCacheResult.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
