import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { GoogleLoginRedirectResponse } from '@dothis/dto';

export class LoginRedirectionResponse extends createZodDto(
  extendApi(GoogleLoginRedirectResponse),
) {}
