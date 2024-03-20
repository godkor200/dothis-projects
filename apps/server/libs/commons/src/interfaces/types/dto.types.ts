import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zPaginatedIgniteQueryParams, zUserModel } from '@dothis/dto';
import { zPaginatedSqlQueryParams } from '@dothis/dto';
export class PaginatedSqlQueryParams extends createZodDto(
  extendApi(zPaginatedSqlQueryParams),
) {
  constructor(props: PaginatedSqlQueryParams) {
    super();
  }
}

export class PaginatedIgniteQueryParams extends createZodDto(
  extendApi(zPaginatedIgniteQueryParams),
) {
  constructor(props: PaginatedIgniteQueryParams) {
    super();
  }
}
export class UserDto extends createZodDto(extendApi(zUserModel)) {}
