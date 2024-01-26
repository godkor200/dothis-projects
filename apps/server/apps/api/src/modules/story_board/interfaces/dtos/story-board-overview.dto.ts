import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zPostStoryBoardOverviewParams, zStoryBoardDetails } from '@dothis/dto';
export class StoryBoardDetails extends createZodDto(
  extendApi(zStoryBoardDetails),
) {}
export class PostStoryBoardDetailParams extends createZodDto(
  extendApi(zPostStoryBoardOverviewParams),
) {
  constructor(props: PostStoryBoardDetailParams) {
    super();
  }
}

export class PostStoryBoardDetailDto extends PostStoryBoardDetailParams {
  readonly body: StoryBoardDetails;
  constructor(props: PostStoryBoardDetailDto) {
    super(props);
    Object.assign(this, props);
  }
}
