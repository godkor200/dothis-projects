import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { zSortSqlQuery } from '@dothis/dto';
import { z } from 'zod';
import {
  getManyStoryBoardDto,
  getOneStoryBoardDto,
} from '@Apps/modules/story_board/interfaces/dtos';

export type TSqlField = z.TypeOf<typeof zSortSqlQuery.shape.field>;
export type TSqlParam = z.TypeOf<typeof zSortSqlQuery.shape.param>;

class BaseStoryBoardDao {
  readonly userInfo: UserInfoCommandDto;

  constructor(
    props:
      | Pick<getManyStoryBoardDto, 'userInfo'>
      | Pick<getOneStoryBoardDto, 'userInfo'>,
  ) {
    this.userInfo = props.userInfo;
  }
}

export class StoryBoardDao extends BaseStoryBoardDao {
  readonly page: number;
  readonly limit: number;
  readonly offset: number;
  readonly field: TSqlField;
  readonly param: TSqlParam;

  constructor(props: getManyStoryBoardDto) {
    super(props);
    this.page = Number(props.page);
    this.limit = Number(props.limit);
    this.offset = Number(props.offset);
    this.field = props.field;
    this.param = props.param;
  }
}

export class FindOneStoryBoardDao extends BaseStoryBoardDao {
  readonly storyId: string;

  constructor(props: getOneStoryBoardDto) {
    super(props);
    this.storyId = props.storyBoardId;
  }
}
