import {
  GetVideoPaginatedPageDto,
  GetVideoPaginatedPageSortDto,
} from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v2/find-video-page.query-handler';

export interface GetVideoDataPageServiceInboundPort {
  execute(props: GetVideoPaginatedPageDto): Promise<TGetVideoPage>;
}
export interface GetVideoDataPageV2ServiceInboundPort {
  execute(props: GetVideoPaginatedPageSortDto): Promise<TGetVideoPage>;
}
