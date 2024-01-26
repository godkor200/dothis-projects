import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { apiRouter, zOrderBy } from '@dothis/dto';
import { getOneStoryBoardDto } from '@Apps/modules/story_board/interfaces/dtos/story-board.dto';
import { match, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';
import { StoryBoardEntity } from '@Apps/modules/story_board/domain/entities/story-board.entity';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';

import { TGetOneStoryBoardRes } from '@Apps/modules/story_board/application/service/get-one-story-board.query';

const c = nestControllerContract(apiRouter.storyBoard);
const { getOneStoryBoard } = c;
type RequestShapes = NestRequestShapes<typeof c>;
const { summary, description, responses } = getOneStoryBoard;
@Controller()
@ApiTags('스토리 보드')
export class GetOneStoryBoardHttpV1Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getOneStoryBoard)
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 1,
    required: false,
  })
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
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
  @ApiNotFoundResponse({ description: StoryNotExistsError.message })
  @ApiInternalServerErrorResponse({
    description: responses['internalServerError'][500],
  })
  @UseGuards(JwtAccessGuard)
  async execute(
    @TsRestRequest()
    { params }: RequestShapes['getOneStoryBoard'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes<StoryBoardEntity>> {
    const arg = new getOneStoryBoardDto({
      storyBoardId: params.storyBoardId,
      userInfo,
    });

    const result: TGetOneStoryBoardRes = await this.queryBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof StoryNotExistsError) {
          throw new NotFoundException(err.message);
        }
        throw new InternalServerErrorException(err.message);
      },
    });
  }
}
