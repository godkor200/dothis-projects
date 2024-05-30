import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zSearch } from '@dothis/dto';

export class GetRankingRelatedWordsParams extends createZodDto(
  extendApi(zSearch),
) {
  constructor(props: GetRankingRelatedWordsParams) {
    super();
  }
}
export class GetRankingRelatedWordsDto extends GetRankingRelatedWordsParams {
  constructor(props: GetRankingRelatedWordsDto) {
    super(props);
    Object.assign(this, props);
  }
}
export class GetRankingRelatedWordsV2Dto extends GetRankingRelatedWordsParams {
  constructor(props: GetRankingRelatedWordsV2Dto) {
    super(props);
    Object.assign(this, props);
  }
}
