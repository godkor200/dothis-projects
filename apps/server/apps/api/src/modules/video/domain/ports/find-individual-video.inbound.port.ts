import { FindIndividualVideoInfoV1Dto } from '@Apps/modules/video/application/dtos/find-individual-video-info.dto';
import { TVideoIndividualRes } from '@Apps/modules/video/application/queries/v1/find-individual-video-info.query-handler';

export interface FindIndividualVideoInboundPort {
  execute(dto: FindIndividualVideoInfoV1Dto): Promise<TVideoIndividualRes>;
}
