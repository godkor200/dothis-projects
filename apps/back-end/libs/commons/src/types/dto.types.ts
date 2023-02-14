import { createZodDto } from '@anatine/zod-nestjs';
import { userModel } from '@dothis/share/dist/index';

export class UserDto extends createZodDto(userModel) {}
export class CreateUserInput extends createZodDto(
  userModel.omit({
    dateSignIn: true,
  }),
) {}

export class UpdateUserInput extends createZodDto(
  userModel.omit({
    dateSignIn: true,
  }),
) {}
