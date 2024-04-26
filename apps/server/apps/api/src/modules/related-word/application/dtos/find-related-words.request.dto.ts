import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zRelatedWord } from '@dothis/dto/dist/index';

export class GetRelatedWordsParams extends createZodDto(
  extendApi(zRelatedWord),
) {
  constructor(props: GetRelatedWordsParams) {
    super();
  }
}

export class GetRelatedWordsDto extends GetRelatedWordsParams {
  constructor(props: GetRelatedWordsDto) {
    super(props);
    Object.assign(this, props);
  }
}
