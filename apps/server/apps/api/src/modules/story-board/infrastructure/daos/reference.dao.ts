import { PostStoryBoardReferenceDto } from '@Apps/modules/story-board/application/dtos';

export class PostReferenceDao extends PostStoryBoardReferenceDto {
  constructor(props: PostReferenceDao) {
    super(props);
    Object.assign(this, props);
  }
}
