import { IIncreaseDailyViews } from '@Apps/modules/video/application/service/helpers/video.aggregate.type';
import { TDailyHitsResult } from '@Apps/modules/hits/infrastructure/repositories/daily-views.cache';

export interface DailyViewCachePort {
  saveRangeDataForDailyHits(
    keyword: string,
    data: IIncreaseDailyViews,
    related?: string,
  ): Promise<void>;

  updateOrAddDataForDailyHits(
    keyword: string,
    additionalItem: IIncreaseDailyViews,
    related?: string,
  ): Promise<void>;

  getDataForDailyHits(
    keyword: string,
    related?: string,
  ): Promise<TDailyHitsResult>;

  getDataForDailyHitsInRange(
    keyword: string,
    from: string,
    to: string,
    related?: string,
  ): Promise<TDailyHitsResult>;
}
