import { Result } from 'oxide.ts';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

export type SaveDailyHitsResult = Result<void, WeeklyViewsError>;

export interface SaveDailyHitsInboundPort {
  execute(): Promise<SaveDailyHitsResult>;
}
