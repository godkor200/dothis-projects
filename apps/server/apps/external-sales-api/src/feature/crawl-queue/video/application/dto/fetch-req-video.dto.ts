import { zPaginatedOffsetQuery } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class PaginatedOffsetQuery extends createZodDto(
  extendApi(zPaginatedOffsetQuery),
) {}
export class FetchReqVideoDto extends PaginatedOffsetQuery {
  constructor(props: PaginatedOffsetQuery) {
    super();
    Object.assign(this, props);
  }
}
