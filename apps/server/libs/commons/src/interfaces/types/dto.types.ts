import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zUserModel } from '@dothis/dto';
import { zPaginatedSqlQueryParams } from '@dothis/dto';
export class PaginatedSqlQueryParams extends createZodDto(
  extendApi(zPaginatedSqlQueryParams),
) {
  constructor(props: PaginatedSqlQueryParams) {
    super();
  }
}
export class UserDto extends createZodDto(extendApi(zUserModel)) {}

export type OrderEnum = 'asc' | 'desc';
