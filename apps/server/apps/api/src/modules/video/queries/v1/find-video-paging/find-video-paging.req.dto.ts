import { IQuery } from '@nestjs/cqrs';
import { findVideoPageQuery, IKeyword, IPageQuery } from '@dothis/dto';
import { IFindVideoPageQuery as IFindVideoPage } from '@Apps/modules/video/queries/v2/find-video-paging/find-video-paging.req.dto';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class IFindVideoPageQuery extends createZodDto(
  extendApi(findVideoPageQuery),
) {}

export class FindVideoPageQuery implements IQuery {
  readonly clusterNumber: number;
  readonly limit: number;
  readonly search: string;
  readonly related?: string;
  readonly last?: string;
  constructor(props: FindVideoPageQuery) {
    Object.assign(this, props);
  }
}
export class IFindVideoPageV1Dto
  extends IFindVideoPage
  implements IFindVideoPageQuery
{
  readonly data?: true | VIDEO_DATA_KEY[];
  constructor(props: IFindVideoPage) {
    super(props);
    this.data = true;
  }
}
