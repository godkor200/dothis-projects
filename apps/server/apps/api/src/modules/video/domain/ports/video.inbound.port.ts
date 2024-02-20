import {
  GetVideoPaginatedPageDto,
  IFindVideoPageV1Dto,
} from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';

export interface VideoInboundPort {
  getVideoDataService(props: GetVideoPaginatedPageDto): Promise<TGetVideoPage>;
}
