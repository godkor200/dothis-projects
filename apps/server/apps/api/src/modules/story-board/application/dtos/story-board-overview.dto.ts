import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { zPostStoryBoardOverviewParams, zStoryBoardDetails } from '@dothis/dto';
export class StoryBoardDetails extends createZodDto(
  extendApi(zStoryBoardDetails),
) {}
export class PostStoryBoardOverviewParams extends createZodDto(
  extendApi(zPostStoryBoardOverviewParams),
) {
  constructor(props: PostStoryBoardOverviewParams) {
    super();
  }
}

export class PostStoryBoardOverviewDto extends PostStoryBoardOverviewParams {
  readonly body: StoryBoardDetails;
  constructor(props: PostStoryBoardOverviewDto) {
    super(props);
    Object.assign(this, props);
  }
}
