import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { relatedWordsApi, zSuccessBase, zErrInternalServer } from '@dothis/dto';

export class DeleteRelWordsBody extends createZodDto(
  extendApi(relatedWordsApi.deleteRelatedWords.body),
) {}

export class DeleteRelWordsParams extends createZodDto(
  extendApi(relatedWordsApi.deleteRelatedWords.pathParams),
) {}

export class DeleteRelWordsSuccessBase extends createZodDto(
  extendApi(zSuccessBase),
) {}
export class InternalServerErr extends createZodDto(
  extendApi(zErrInternalServer),
) {}
export class DeleteRelWordsCommandDto {
  constructor(
    public readonly id: string,
    public readonly deleteRelWords: Array<string>,
  ) {}
}
