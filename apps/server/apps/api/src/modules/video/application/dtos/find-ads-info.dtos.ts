import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zFindVideoBySearchKeyword } from '@dothis/dto';

export class FindAdsInfoQuery extends createZodDto(
  extendApi(zFindVideoBySearchKeyword),
) {
  constructor(props: FindAdsInfoQuery) {
    super();
    Object.assign(this, props);
  }
}
export class FindAdsInfoDto extends FindAdsInfoQuery {
  readonly clusterNumber: string | string[];

  constructor(props: FindAdsInfoDto) {
    super(props);
    if (typeof props.clusterNumber === 'string') {
      this.clusterNumber = props.clusterNumber.includes(',')
        ? props.clusterNumber.split(',')
        : props.clusterNumber;
    }
  }
}
