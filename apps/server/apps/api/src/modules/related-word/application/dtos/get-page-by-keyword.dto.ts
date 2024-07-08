import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zSearch } from '@dothis/dto';

export class GetPageByKeywordQuery extends createZodDto(extendApi(zSearch)) {
  constructor(props: GetPageByKeywordQuery) {
    super();
  }
}
export class GetPageByKeywordDto extends GetPageByKeywordQuery {
  constructor(props: GetPageByKeywordDto) {
    super(props);
    Object.assign(this, props);
  }
}
