import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zAuth } from '@dothis/dto';

export class AuthToken extends createZodDto(extendApi(zAuth)) {}
