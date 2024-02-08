import { FindDailyViewsV1Dto } from '@Apps/modules/hits/application/dtos/find-daily-views.dtos';
import { TRelatedVideoAndHistoryRes } from '@Apps/modules/video/domain/ports/video.outbound.port';

export interface VideoServiceInterface {
  getRelatedVideoAndHistory(
    props: FindDailyViewsV1Dto,
  ): Promise<TRelatedVideoAndHistoryRes>;
}
