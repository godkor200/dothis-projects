import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zUserModel, WeeklyKeywordsListSourceSchema } from '@dothis/dto';

export class UserDto extends createZodDto(extendApi(zUserModel)) {}
