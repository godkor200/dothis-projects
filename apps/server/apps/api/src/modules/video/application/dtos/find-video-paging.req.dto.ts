import {
  findVideoPageQuery,
  zPaginatedIgniteQueryParams,
  zPaginatedIgniteQuerySort,
} from '@dothis/dto';
import { IFindVideoPageQuery as IFindVideoPage } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/application/dtos/find-videos.dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class IFindVideoPageQuery extends createZodDto(
  extendApi(findVideoPageQuery),
) {
  readonly cluster?: string;
  constructor(props: IFindVideoPageQuery) {
    super();
    this.cluster = props.cluster;
  }
}

export class IFindVideoPageV1Dto extends IFindVideoPage {
  readonly cluster?: string;
  readonly data?: true | VIDEO_DATA_KEY[];
  constructor(props: IFindVideoPage) {
    super(props);
    this.data = true;
    Object.assign(this, props);
  }
}
export class GetVideoPaginatedPageDto extends createZodDto(
  extendApi(zPaginatedIgniteQueryParams),
) {
  clusterNumber: string[];

  constructor(props: GetVideoPaginatedPageDto) {
    super();
    Object.assign(this, props);
    if (typeof props.clusterNumber === 'string') {
      this.clusterNumber = props.clusterNumber;
    }
  }
}

export class GetVideoPaginatedPageSortQuery extends createZodDto(
  extendApi(zPaginatedIgniteQuerySort),
) {
  constructor(props: GetVideoPaginatedPageSortQuery) {
    super();
    Object.assign(this, props);
  }
}

export class GetVideoPaginatedPageSortDto extends GetVideoPaginatedPageSortQuery {
  constructor(props: GetVideoPaginatedPageSortDto) {
    super(props);
    Object.assign(this, props);
  }
}
