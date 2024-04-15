import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { relatedWordsApi } from '@dothis/dto';
import { zSuccessBase } from '@dothis/dto/dist/lib/success.response.zod';

export class DeleteKeyWordParams extends createZodDto(
  extendApi(relatedWordsApi.deleteKeyWord.pathParams),
) {}
export class DeleteKeyWordSuccessBase extends createZodDto(
  extendApi(zSuccessBase),
) {}
export class DeleteKeyWordCommandDto {
  constructor(public readonly id: string) {}
}
