import { PostStoryBoardMemoDto } from '@Apps/modules/story_board/interfaces/dtos';

export class PostMemoDao extends PostStoryBoardMemoDto {
  constructor(props: PostMemoDao) {
    super(props);
    Object.assign(this, props);
  }
}
