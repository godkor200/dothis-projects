import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedSqlQueryParams } from '@Libs/commons/src/interfaces/types/dto.types';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  TsRest,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { JwtAccessGuard, Paginated, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { match } from 'oxide.ts';
import {
  NotFoundErr,
  StoryNotExistsError,
} from '@Apps/modules/story-board/domain/events/errors';
import {
  Controller,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TGetManyStoryBoardRes } from '@Apps/modules/story-board/application/queries/get-many-story-board.query';
import { apiRouter } from '@dothis/dto';
import { GetManyStoryBoardDto } from '@Apps/modules/story-board/application/dtos';
import { AuthToken } from '@Apps/common/auth/domain/event/auth.event';

import { InternalServerErr } from '@Apps/common/auth/domain/event/auth.error';
import { StoryBoardCreateArrayRes } from '@Apps/modules/story-board/domain/events/response';
const c = nestControllerContract(apiRouter.storyBoard);
const { getManyStoryBoard } = c;
const { summary, description, responses } = getManyStoryBoard;

@Controller()
@ApiTags('스토리 보드')
export class GetManyStoryBoardHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOkResponse({
    type: StoryBoardCreateArrayRes,
  })
  @ApiOperation({
    summary,
    description,
  })
  @TsRestHandler(getManyStoryBoard)
  @ApiNotFoundResponse({ type: NotFoundErr })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAccessGuard)
  async execute(
    @User() userInfo: UserInfoCommandDto,
    @Query() query: PaginatedSqlQueryParams,
    @Headers() headers: AuthToken,
  ) {
    return tsRestHandler(getManyStoryBoard, async ({ query }) => {
      const arg = new GetManyStoryBoardDto({ ...query, userInfo });
      const result: TGetManyStoryBoardRes = await this.queryBus.execute(arg);

      return match<
        TGetManyStoryBoardRes,
        TTsRestRes<IRes<Paginated<StoryBoardEntity>>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: {
            success: true,
            data: result,
          },
        }),
        Err: (err: Error) => {
          if (err instanceof StoryNotExistsError) {
            throw new NotFoundException(err.message);
          }
          throw new InternalServerErrorException(err.message);
        },
      });
    });
  }
}
