import { IFindAccumulateVideosV1Res } from '@Apps/modules/video/application/queries/v1/find-accumulate-videos.query-handler';
import { FindAccumulateVideosV1Dto } from '@Apps/modules/video/application/dtos/find-accumulate-videos.dtos';

export interface FindAccumulateVideoInboundPort {
  execute(dto: FindAccumulateVideosV1Dto): Promise<IFindAccumulateVideosV1Res>;
}
