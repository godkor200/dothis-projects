import { createZodDto } from '@anatine/zod-nestjs';
import { zUser } from '@dothis/share/lib/dto';

export class UserDto extends createZodDto(zUser) {}
export class CreateUserInput extends createZodDto(
  zUser.omit({
    dateSignIn: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  zUser.omit({
    dateSignIn: true,
  }),
) {}
