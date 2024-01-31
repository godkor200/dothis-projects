import {
  TPostStoryBoardBody,
  zPostStoryBoardReferenceParams,
} from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

/**
 * 파일 올리기
 */
export class PostStoryBoardReferenceParams extends createZodDto(
  extendApi(zPostStoryBoardReferenceParams),
) {
  constructor(props: PostStoryBoardReferenceParams) {
    super();
  }
}
export class PostStoryBoardReferenceDto extends PostStoryBoardReferenceParams {
  readonly body: TPostStoryBoardBody;
  constructor(props: PostStoryBoardReferenceDto) {
    super(props);
    Object.assign(this, props);
  }
}
