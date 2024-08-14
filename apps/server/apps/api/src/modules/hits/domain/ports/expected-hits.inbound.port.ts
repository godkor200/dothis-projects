import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';

export interface ExpectedHitsInboundPort {
  execute(dto: ExpectedViewsV1Dto): Promise<any>;
}
