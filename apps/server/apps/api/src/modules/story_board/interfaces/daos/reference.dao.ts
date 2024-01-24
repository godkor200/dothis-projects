import { PostStoryBoardReferenceDto } from '@Apps/modules/story_board/interfaces/dtos';

export class PostReferenceDao extends PostStoryBoardReferenceDto {
  constructor(props: PostReferenceDao) {
    super(props);
    Object.assign(this, props);
  }
}
