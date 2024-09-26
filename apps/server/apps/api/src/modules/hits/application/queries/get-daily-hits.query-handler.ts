import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDailyViewsDto } from '@Apps/modules/hits/application/dtos/find-daily-view.v1.dto';

import {
  DAILY_HITS_SERVICE_DI_TOKEN,
  DAILY_VIEW_CACHE_DI_TOKEN,
  REPRESENTATIVE_CATEGORY_SERVICE_DI_TOKEN,
} from '@Apps/modules/hits/hits.di-token.contants';
import { DailyHitsServiceInboundPort } from '@Apps/modules/hits/domain/ports/daily-hits-service.inbound.port';
import { Inject } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';
import { IIncreaseDailyViews } from '@Apps/modules/video/application/service/helpers/video.aggregate.type';
import { DailyViewCachePort } from '@Apps/modules/hits/domain/ports/daily-view.cache.port';
import { GetRepresentativeCategoryInboundPort } from '@Apps/modules/video/domain/ports/get-representative-category.inbound.port';

export type TFindDailyView = Result<
  IIncreaseDailyViews,
  VideoNotFoundError | VideoHistoryNotFoundError
>;

@QueryHandler(FindDailyViewsDto)
export class GetDailyHitsQueryHandler
  implements IQueryHandler<FindDailyViewsDto, TFindDailyView>
{
  constructor(
    @Inject(DAILY_HITS_SERVICE_DI_TOKEN)
    private readonly _service: DailyHitsServiceInboundPort,

    @Inject(REPRESENTATIVE_CATEGORY_SERVICE_DI_TOKEN)
    private readonly _representativeService: GetRepresentativeCategoryInboundPort,

    @Inject(DAILY_VIEW_CACHE_DI_TOKEN)
    private readonly _cache: DailyViewCachePort,
  ) {}

  async execute(props: FindDailyViewsDto): Promise<TFindDailyView> {
    try {
      const cache = await this._cache.getDataForDailyHitsInRange(
        props.search,
        props.from,
        props.to,
        props.related,
      );

      if (cache.isOk()) {
        const cacheUnwrap = cache.unwrap();

        // 캐시 데이터에 null이 있으면 서비스 호출
        if (cacheUnwrap.some((item) => item === null)) {
          return await this._service.execute(props);
        }

        const representative = await this._representativeService.execute({
          search: props.search,
          related: props.related,
        });

        const representativeUnwrap = representative.unwrap();
        return Ok({
          success: true,
          representativeCategory: representativeUnwrap.representativeCategory,
          data: cacheUnwrap,
        });
      }

      // VideoCacheNotFoundError와 다른 경우에도 기본 서비스 호출
      return await this._service.execute(props);
    } catch (error) {
      return Err(error);
    }
  }
}
