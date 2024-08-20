import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zGetAdsRelatedTopHits } from '@dothis/dto';
import { IGetVideoClusterInterface } from '@Libs/types';

export class FindAdsTopHitsQuery extends createZodDto(
  extendApi(zGetAdsRelatedTopHits),
) {}
export class FindAdsTopHitsDto
  extends FindAdsTopHitsQuery
  implements IGetVideoClusterInterface
{
  readonly clusterNumber: string | string[];

  constructor(props: FindAdsTopHitsDto) {
    super();
    Object.assign(this, props);
  }
}
