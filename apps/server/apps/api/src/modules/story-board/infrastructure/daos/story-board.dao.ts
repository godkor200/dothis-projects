import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { zSortSqlQuery } from '@dothis/dto';
import { z } from 'zod';
import {
  GetManyStoryBoardDto,
  GetOneStoryBoardDto,
} from '@Apps/modules/story-board/application/dtos';

export type TSqlField = z.TypeOf<typeof zSortSqlQuery.shape.sort>;
export type TSqlParam = z.TypeOf<typeof zSortSqlQuery.shape.order>;

class BaseStoryBoardDao {
  readonly userInfo: UserInfoCommandDto;

  constructor(
    props:
      | Pick<GetManyStoryBoardDto, 'userInfo'>
      | Pick<GetOneStoryBoardDto, 'userInfo'>,
  ) {
    this.userInfo = props.userInfo;
  }
}

export class StoryBoardDao extends BaseStoryBoardDao {
  readonly page: number;
  readonly limit: number;
  readonly offset: number;
  readonly sort: TSqlField;
  readonly order: TSqlParam;

  constructor(props: GetManyStoryBoardDto) {
    super(props);
    this.page = Number(props.page);
    this.limit = Number(props.limit);
    this.sort = props.sort;
    this.order = props.order;
  }
}

export class FindOneStoryBoardDao extends BaseStoryBoardDao {
  readonly storyId: string;

  constructor(props: GetOneStoryBoardDto) {
    super(props);
    this.storyId = props.storyBoardId;
  }
}
