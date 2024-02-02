import { PostStoryBoardMemoDto } from '@Apps/modules/story-board/application/dtos';

export class PostMemoDao extends PostStoryBoardMemoDto {
  constructor(props: PostMemoDao) {
    super(props);
    Object.assign(this, props);
  }
}
