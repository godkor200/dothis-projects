import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';

export class VideoPerformanceDao extends GetProbabilitySuccessDto {
  constructor(props: GetProbabilitySuccessDto) {
    super(props);
  }
}
