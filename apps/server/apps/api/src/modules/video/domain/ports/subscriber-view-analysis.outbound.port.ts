import { SubscriberViewsDao } from '@Apps/modules/hits/infrastructure/daos/subscriber-views.dao';
import { Result } from 'oxide.ts';
import { SubscriberViewAnalysisError } from '@Apps/modules/video/domain/events/video.error';

export type TSubscriberViewAnalysisResult = Result<
  {
    key: string;
    from: number;
    to?: number;
    docCount: number;
    totalVideoViews: number;
  }[],
  SubscriberViewAnalysisError
>;
export interface SubscriberViewAnalysisOutboundPort {
  execute(dao: SubscriberViewsDao): Promise<TSubscriberViewAnalysisResult>;
}
