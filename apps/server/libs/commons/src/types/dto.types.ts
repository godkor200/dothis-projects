import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  zUserModel,
  zRelWordsArray,
  zVideoHistory,
  zVideoModel,
} from '@dothis/dto';
import { z } from 'zod';
import { IQuery } from '@nestjs/cqrs';
export class UserDto extends createZodDto(extendApi(zUserModel)) {}
export class UserRes extends UserDto {}
export class VideoHistoryRes extends createZodDto(extendApi(zVideoHistory)) {}

export class VideoRes extends createZodDto(extendApi(zVideoModel)) {}

export class RelwordsRes extends createZodDto(extendApi(zRelWordsArray)) {}
// export class CreateUserInput extends createZodDto(
//   // userModel.omit({
//   //   dateSignIn: true,
//   // }),
// ) {}

// export class UpdateUserInput extends createZodDto(
//   userModel.omit({
//     dateSignIn: true,
//   }),
// ) {}
