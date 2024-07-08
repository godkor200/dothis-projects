import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zKeywordSchema, zOnlyLimit } from '@dothis/dto';
export class GetWeeklyKeywordRes extends createZodDto(
  extendApi(zKeywordSchema),
) {}
export class GetWeeklyKeywordQuery extends createZodDto(extendApi(zOnlyLimit)) {
  constructor(props: GetWeeklyKeywordQuery) {
    super();
    Object.assign(this, props);
  }
}

export class GetWeeklyKeywordDto extends GetWeeklyKeywordQuery {
  constructor(props: GetWeeklyKeywordDto) {
    super(props);
    Object.assign(this, props);
  }
}
