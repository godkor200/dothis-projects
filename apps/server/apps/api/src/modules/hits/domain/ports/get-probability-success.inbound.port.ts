import { TGetProbabilityRes } from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';

export interface GetProbabilitySuccessInboundPort {
  execute(dto: GetProbabilitySuccessDto): Promise<TGetProbabilityRes>;
}
