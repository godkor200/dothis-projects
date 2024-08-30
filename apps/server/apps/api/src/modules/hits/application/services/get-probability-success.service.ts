import { GetProbabilitySuccessInboundPort } from '@Apps/modules/hits/domain/ports/get-probability-success.inbound.port';
import { GetProbabilitySuccessDto } from '@Apps/modules/hits/application/dtos/get-probability-success.dto';
import { TGetProbabilityRes } from '@Apps/modules/hits/application/queries/get-probability-success.query-handler';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import { VIDEO_PERFORMANCE_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { IVideoPerformanceOutboundPort } from '@Apps/modules/video/domain/ports/video.performance.outbound.port';

export class GetProbabilitySuccessService
  implements GetProbabilitySuccessInboundPort
{
  constructor(
    @Inject(VIDEO_PERFORMANCE_DI_TOKEN)
    private readonly videoPerformanceAdapter: IVideoPerformanceOutboundPort,
  ) {}

  async execute(dto: GetProbabilitySuccessDto): Promise<TGetProbabilityRes> {
    try {
      const res = await this.videoPerformanceAdapter.execute(dto);
      if (res.isOk()) {
        return Ok({ success: true, data: res.unwrap() });
      }
    } catch (e) {
      return Err(e);
    }
  }
}
