import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { relatedWordsApi, zSuccessBase } from '@dothis/dto';

export class DeleteKeyWordParams extends createZodDto(
  extendApi(relatedWordsApi.deleteKeyWord.pathParams),
) {}
export class DeleteKeyWordSuccessBase extends createZodDto(
  extendApi(zSuccessBase),
) {}
export class DeleteKeyWordCommandDto {
  constructor(public readonly id: string) {}
}
