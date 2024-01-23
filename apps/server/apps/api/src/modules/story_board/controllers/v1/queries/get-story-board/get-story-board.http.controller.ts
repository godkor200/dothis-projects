import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { IRes } from '@Libs/commons/src/types/res.types';
import { apiRouter } from '@dothis/dto';
import {
  getStoryBoardDto,
  PostStoryBoardMainParams,
} from '@Apps/modules/story_board/interfaces/dtos/recent-story-board.dto';
import { match, Result } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story_board/domain/errors/story.error';
import { RecentStoryBoardEntity } from '@Apps/modules/story_board/domain/entities/recent-story-board.entity';
const c = nestControllerContract(apiRouter.storyBoard);
const { getStoryBoard } = c;
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
@ApiTags('스토리 보드')
export class GetStoryBoardHttpV1Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getStoryBoard)
  @ApiParam({ name: 'storyBoardId' })
  async execute(
    @TsRestRequest() { params }: RequestShapes['getStoryBoard'],
  ): Promise<IRes<RecentStoryBoardEntity>> {
    console.log(params.storyBoardId);
    const arg = new getStoryBoardDto(params);
    console.log(arg);

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
