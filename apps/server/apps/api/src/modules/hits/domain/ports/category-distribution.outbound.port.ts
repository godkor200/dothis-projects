import { Result } from 'oxide.ts';
import { CategoryDistributionDao } from '@Apps/modules/hits/infrastructure/daos/category-distribution.dao';

export type TCategoryDistributionOutboundResult = Result<any, any>;

export interface CategoryDistributionOutbound {
  execute(
    dao: CategoryDistributionDao,
  ): Promise<TCategoryDistributionOutboundResult>;
}
