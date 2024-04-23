import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zFindVideoBySearchKeywordFindChannelClusterNumberMulti,
  zSortChannelInfo,
} from '@dothis/dto';
import { z } from 'zod';
import { TSqlParam } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';

export type TSqlField = z.TypeOf<typeof zSortChannelInfo.shape.sort>;
export interface IFindInfluentialListQuery {
  search: string;
  related: string;
  from: string;
  to: string;
  clusterNumber: string[];
  sort: TSqlField;
  order: TSqlParam;
}

export class FindInfluentialListQuery extends createZodDto(
  extendApi(zFindVideoBySearchKeywordFindChannelClusterNumberMulti),
) {
  constructor(props: FindInfluentialListQuery) {
    super();
    Object.assign(this, props);
  }
}
export class FindInfluentialListDto implements IFindInfluentialListQuery {
  clusterNumber: string[];
  from: string;
  related: string;
  search: string;
  to: string;
  sort: TSqlField;
  order: TSqlParam;

  constructor(props: IFindInfluentialListQuery) {
    this.clusterNumber = props.clusterNumber;
    this.from = props.from;
    this.related = props.related;
    this.search = props.search;
    this.to = props.to;
    this.sort = props.sort;
    this.order = props.order;
  }
}
