import {
  Controller,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';

import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { nestControllerContract, TsRest, tsRestHandler } from '@ts-rest/nest';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { apiRouter } from '@dothis/dto';
import {
  GetOneStoryBoardDto,
  PostStoryBoardMainParams,
} from '@Apps/modules/story-board/application/dtos/story-board.dto';
import { match } from 'oxide.ts';
import {
  NotFoundErr,
  StoryNotExistsError,
} from '@Apps/modules/story-board/domain/events/errors/story.error';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

import { TGetOneStoryBoardRes } from '@Apps/modules/story-board/application/queries/get-one-story-board.query';
import { InternalServerErr } from '@Apps/common/auth/domain/event/auth.error';
import { TTsRestRes } from '@Apps/modules/hits/interfaces/http/controllers/v1/find-daily-view/find-daily-view.v1.http.controller';
import { AuthToken } from '@Apps/common/auth/domain/event/auth.event';

const c = nestControllerContract(apiRouter.storyBoard);
const { getOneStoryBoard } = c;

const { summary, description } = getOneStoryBoard;
@Controller()
@ApiTags('스토리 보드')
export class GetOneStoryBoardHttpV1Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getOneStoryBoard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
        },
        data: {
          type: 'array',
          description: '불러온 데이터',
        },
      },
      required: ['success', 'data'],
    },
  })
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({ type: NotFoundErr })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @UseGuards(JwtAccessGuard)
  async execute(
    @Headers() headers: AuthToken,
    @User() userInfo: UserInfoCommandDto,
    @Param() params: PostStoryBoardMainParams,
  ) {
    return tsRestHandler(getOneStoryBoard, async ({ params }) => {
      const arg = new GetOneStoryBoardDto({
        storyBoardId: params.storyBoardId,
        userInfo,
      });

      const result: TGetOneStoryBoardRes = await this.queryBus.execute(arg);
      return match<TGetOneStoryBoardRes, TTsRestRes<IRes<StoryBoardEntity>>>(
        result,
        {
          Ok: (result) => ({ status: 200, body: result }),
          Err: (err: Error) => {
            if (err instanceof StoryNotExistsError) {
              throw new NotFoundException(err.message);
            }
            throw new InternalServerErrorException(err.message);
          },
        },
      );
    });
  }
}
