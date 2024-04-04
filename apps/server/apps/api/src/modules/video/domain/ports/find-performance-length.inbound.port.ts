import { FindPerformanceLengthDto } from '@Apps/modules/video/application/dtos/find-performance-length.dto';
import { TFindPerformanceLengthResult } from '@Apps/modules/video/application/queries/v1/find-performance-length.query-handler';

export interface FindPerformanceLengthInboundPort {
  execute(dto: FindPerformanceLengthDto): Promise<TFindPerformanceLengthResult>;
}
