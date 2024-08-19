import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zCrawlingCompleteSchema } from '@dothis/dto';

export class CompleteVideoShortsBody extends createZodDto(
  extendApi(zCrawlingCompleteSchema),
) {}
export class CompleteVideoShortsDto extends CompleteVideoShortsBody {
  constructor(props: CompleteVideoShortsBody) {
    super();
    Object.assign(this, props);
  }
}
