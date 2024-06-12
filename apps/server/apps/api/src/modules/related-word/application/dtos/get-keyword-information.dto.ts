import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zSearch } from '@dothis/dto';

export class GetKeywordInformationQuery extends createZodDto(
  extendApi(zSearch),
) {
  constructor(props: GetKeywordInformationQuery) {
    super();
  }
}
export class GetKeywordInformationDto extends GetKeywordInformationQuery {
  constructor(props: GetKeywordInformationDto) {
    super(props);
    Object.assign(this, props);
  }
}
