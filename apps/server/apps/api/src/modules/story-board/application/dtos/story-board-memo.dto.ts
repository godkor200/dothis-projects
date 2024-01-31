import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { TPostStoryBoardBody, zPostStoryBoardMemoParams } from '@dothis/dto';

/**
 * 메모
 */
export class PostStoryBoardMemoParams extends createZodDto(
  extendApi(zPostStoryBoardMemoParams),
) {
  constructor(props: PostStoryBoardMemoParams) {
    super();
  }
}

export class PostStoryBoardMemoDto extends PostStoryBoardMemoParams {
  readonly body: TPostStoryBoardBody;

  constructor(props: PostStoryBoardMemoDto) {
    super(props);
    Object.assign(this, props);
  }
}
