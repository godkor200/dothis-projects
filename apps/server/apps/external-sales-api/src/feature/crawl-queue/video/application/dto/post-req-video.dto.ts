import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { requestVideoBody } from '@dothis/dto';

export class PostReqVideoBody extends createZodDto(
  extendApi(requestVideoBody),
) {}

export class PostRequestVideoDto extends PostReqVideoBody {
  constructor(props: PostReqVideoBody) {
    super();
    Object.assign(this, props);
  }
}
