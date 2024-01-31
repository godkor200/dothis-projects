import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedSqlQueryParams } from '@Libs/commons/src/interfaces/types/dto.types';
import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { match } from 'oxide.ts';
import { StoryNotExistsError } from '@Apps/modules/story-board/domain/errors';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TGetManyStoryBoardRes } from '@Apps/modules/story-board/application/queries/get-many-story-board.query';
import { apiRouter } from '@dothis/dto';
import { getManyStoryBoardDto } from 'apps/api/src/modules/story-board/application/dtos';
const c = nestControllerContract(apiRouter.storyBoard);
const { getManyStoryBoard } = c;
type RequestShapes = NestRequestShapes<typeof c>;
const { summary, description, responses } = getManyStoryBoard;

@Controller()
@ApiTags('스토리 보드')
export class GetManyStoryBoardHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @ApiQuery({
    type: PaginatedSqlQueryParams,
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
  @TsRest(getManyStoryBoard)
  @ApiNotFoundResponse({ description: StoryNotExistsError.message })
  // @ApiInternalServerErrorResponse({
  //   description: responses['internalServerError'][500],
  // })
  @UseGuards(JwtAccessGuard)
  async execute(
    @TsRestRequest()
    { query }: RequestShapes['getManyStoryBoard'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes<StoryBoardEntity[]>> {
    const arg = new getManyStoryBoardDto({ ...query, userInfo });
    const result: TGetManyStoryBoardRes = await this.queryBus.execute(arg);

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
