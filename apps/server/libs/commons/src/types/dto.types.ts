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
export const zPaginatedQuery = z.object({
  limit: z.number().describe('Specifies a limit of returned records'),
  last: z.string().describe('Last index returned').optional(),
});

export const zKeyword = z.object({
  search: z.string().describe('탐색어'),
  related: z.string().describe('연관어').optional(),
});
export interface IKeyword extends z.TypeOf<typeof zKeyword> {}
export interface IPageQuery extends z.TypeOf<typeof zPaginatedQuery> {}

export interface IFindVideoPageQuery extends IKeyword, IPageQuery, IQuery {}
