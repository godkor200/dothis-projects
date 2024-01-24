import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { IRes } from '@Libs/commons/src/types/res.types';
import { apiRouter } from '@dothis/dto';
import { getStoryBoardDto } from '@Apps/modules/story_board/interfaces/dtos/recent-story-board.dto';
import { match, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
const c = nestControllerContract(apiRouter.storyBoard);
const { getStoryBoard } = c;
type RequestShapes = NestRequestShapes<typeof c>;
const { summary, description, responses } = getStoryBoard;
@Controller()
@ApiTags('스토리 보드')
export class GetStoryBoardHttpV1Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getStoryBoard)
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 26,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
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
  async execute(
    @TsRestRequest() { params }: RequestShapes['getStoryBoard'],
  ): Promise<IRes<RecentStoryBoardEntity>> {
    const arg = new getStoryBoardDto(params);
    const result: Result<
      RecentStoryBoardEntity,
      StoryNotExistsError | InternalServerErrorException
    > = await this.queryBus.execute(arg);
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
