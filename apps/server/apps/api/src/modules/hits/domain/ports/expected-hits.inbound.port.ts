import { ExpectedViewsV1Dto } from '@Apps/modules/hits/application/dtos/expected-hits.dtos';
import { TExpectedViewsV1QueryHandlerRes } from '@Apps/modules/hits/application/queries/expected-views.v1.query-handler';

export interface ExpectedHitsInboundPort {
  execute(dto: ExpectedViewsV1Dto): Promise<TExpectedViewsV1QueryHandlerRes>;
}
