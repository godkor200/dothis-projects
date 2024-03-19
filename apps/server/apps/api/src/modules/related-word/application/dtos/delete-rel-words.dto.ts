import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { relatedWordsApi, zDeleteRelWords } from '@dothis/dto';

export class DeleteRelWordsBody extends createZodDto(
  extendApi(relatedWordsApi.deleteRelatedWords.body),
) {}

export class DeleteRelWordsParams extends createZodDto(
  extendApi(relatedWordsApi.deleteRelatedWords.pathParams),
) {}

export class DeleteRelWordsCommandDto {
  constructor(
    public readonly id: string,
    public readonly deleteRelWords: Array<string>,
  ) {}
}
