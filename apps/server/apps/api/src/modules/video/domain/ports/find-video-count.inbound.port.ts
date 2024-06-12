import { TFindVideoCount } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';

export interface findVideoCountByDateServiceInboundPort {
  execute(dto: FindVideoCountDto): Promise<TFindVideoCount>;
}
