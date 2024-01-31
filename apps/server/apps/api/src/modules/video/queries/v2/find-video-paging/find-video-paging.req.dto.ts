import { IQuery } from '@nestjs/cqrs';
import { zFindVideoPageWithClusterQuery } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class IFindVideoPageQuery extends createZodDto(
  extendApi(zFindVideoPageWithClusterQuery),
) {
  constructor(props: IFindVideoPageQuery) {
    super();
    Object.assign(this, props);
  }
}
export class FindVideoPageV2Dto extends IFindVideoPageQuery {
  readonly clusterNumbers: number[];
  constructor(props: IFindVideoPageQuery) {
    super(props);
    this.clusterNumbers = props.cluster.split(',').map((item) => Number(item));
    Object.assign(this, props);
  }
}
export class FindVideoPageV2Query implements IQuery {
  readonly clusterNumbers: number[];
  readonly limit: number;
  readonly search: string;
  readonly related?: string;
  readonly last?: string;
  constructor(props: FindVideoPageV2Query) {
    Object.assign(this, props);
  }
}
