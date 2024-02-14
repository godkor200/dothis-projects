import {
  ApiBearerAuth,
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { CommandBus } from '@nestjs/cqrs';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { match, Result } from 'oxide.ts';
import {
  PostStoryBoardBody,
  PostStoryBoardMainDraftDto,
  PostStoryBoardMainDto,
  RecentStoryBoardCreateDto,
  PostStoryBoardDetailDto,
  PostStoryBoardReferenceDto,
  PostStoryBoardMemoDto,
  PostStoryBoardBodyBoolean,
} from '@Apps/modules/story-board/application/dtos';

import {
  StoryNotExistsError,
  ReferNotExistsError,
  MemoNotExistsError,
} from '@Apps/modules/story-board/domain/errors';

const c = nestControllerContract(apiRouter.storyBoard);
const {
  createStoryBoard,
  addStoryBoardDetail,
  updateStoryBoardTitle,
  addStoryBoardReference,
  addStoryBoardMemo,
  updateStoryBoardDraft,
} = c;

const { summary: createSummary, description: createDescription } =
  createStoryBoard;
const { summary: addDetailSummary, description: addDetailDescription } =
  addStoryBoardDetail;
const { summary: updateTitleSummary, description: updateTitleDescription } =
  updateStoryBoardTitle;
const { summary: addReferenceSummary, description: addReferenceDescription } =
  addStoryBoardReference;
const { summary: addMemoSummary, description: addMemoDescription } =
  addStoryBoardMemo;
const { summary: updateDraftSummary, description: updateDraftDescription } =
  updateStoryBoardDraft;

type RequestShapes = NestRequestShapes<typeof c>;
@Controller()
@ApiTags('스토리 보드')
export class PostStoryBoardHttpV1Controller {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(createStoryBoard)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: createSummary,
    description: createDescription,
  })
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  async createStoryBoard(
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes<StoryBoardEntity>> {
    const arg = new RecentStoryBoardCreateDto(userInfo);

    const result: Result<StoryBoardEntity, InternalServerErrorException> =
      await this.commandBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        throw new InternalServerErrorException(err.message);
      },
    });
  }

  @TsRest(updateStoryBoardDraft)
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: updateDraftSummary,
    description: updateDraftDescription,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 1,
  })
  @ApiBody({ type: PostStoryBoardBodyBoolean })
  async toggleAutoSave(
    @TsRestRequest()
    { params, body }: RequestShapes['updateStoryBoardDraft'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const arg = new PostStoryBoardMainDraftDto({
      ...params,
      body,
    });

    const result: Result<
      boolean,
      StoryNotExistsError | InternalServerErrorException
    > = await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof StoryNotExistsError) {
          throw new NotFoundException(err.message);
        }
        throw new InternalServerErrorException(err.message);
      },
    });
  }

  @TsRest(updateStoryBoardTitle)
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  @ApiOperation({
    summary: updateTitleSummary,
    description: updateTitleDescription,
  })
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 1,
  })
  @ApiBody({ type: PostStoryBoardBody })
  async updateStoryBoardTitle(
    @TsRestRequest()
    { params, body }: RequestShapes['updateStoryBoardTitle'],
  ): Promise<IRes> {
    const arg = new PostStoryBoardMainDto({
      ...params,
      body,
    });

    const result: Result<
      boolean,
      StoryNotExistsError | InternalServerErrorException
    > = await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof StoryNotExistsError) {
          throw new NotFoundException(err.message);
        }
        throw new InternalServerErrorException(err.message);
      },
    });
  }

  @TsRest(addStoryBoardDetail)
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  @ApiParam({
    name: 'overviewId',
    description: '생성된 overview id 값을 받습니다.',
    example: 1,
  })
  @ApiOperation({
    summary: addDetailSummary,
    description: addDetailDescription,
  })
  @ApiNotFoundResponse({ description: StoryNotExistsError.message })
  @ApiBody({
    schema: {
      oneOf: [
        {
          properties: {
            description: { type: 'string', description: '스토리 보드 설명' },
          },
          required: ['description'],
        },
        {
          properties: {
            uploadDate: {
              type: 'string',
              format: 'date-time',
              description: '업로드 예정날짜',
            },
          },
          required: ['uploadDate'],
        },
        {
          properties: {
            actors: { type: 'string', description: '배우' },
          },
          required: ['actors'],
        },
        {
          properties: {
            location: { type: 'string', description: '촬영지' },
          },
          required: ['location'],
        },
      ],
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
        },
      },
      required: ['success'],
    },
  })
  @ApiNotFoundResponse({ description: 'The detail does not exist' })
  async addStoryBoardDetail(
    @TsRestRequest()
    { params, body }: RequestShapes['addStoryBoardDetail'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const arg = new PostStoryBoardDetailDto({ ...params, body });
    const result: Result<
      boolean,
      StoryNotExistsError | InternalServerErrorException
    > = await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof StoryNotExistsError)
          throw new NotFoundException(err.message);
        throw new InternalServerErrorException(err.message);
      },
    });
  }

  @TsRest(addStoryBoardReference)
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        value: {
          type: 'string',
          description:
            '해당하는 객체의 value : 여기서는 s3에서 받은 url 에 해당합니다.',
        },
      },
      required: ['value'],
    },
  })
  @ApiOperation({
    summary: addReferenceSummary,
    description: addReferenceDescription,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
        },
      },
      required: ['success'],
    },
  })
  @ApiNotFoundResponse({ description: StoryNotExistsError.message })
  @ApiInternalServerErrorResponse({})
  async addStoryBoardReference(
    @TsRestRequest() { params, body }: RequestShapes['addStoryBoardReference'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const arg = new PostStoryBoardReferenceDto({ ...params, body });
    const result: Result<
      boolean,
      ReferNotExistsError | InternalServerErrorException
    > = await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof ReferNotExistsError)
          throw new NotFoundException(err.message);
        throw new InternalServerErrorException(err.message);
      },
    });
  }

  @TsRest(addStoryBoardMemo)
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description:
        "우리 사이트 accessToken(ex:'Bearer ~~~~~~') 상단에 Authorize 눌러 토큰을 저장하고 사용하세요",
    },
  ])
  @ApiParam({
    name: 'storyBoardId',
    description: '생성된 스토리보드 id 값을 받습니다.',
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        value: {
          type: 'string',
          description:
            '해당하는 객체의 value : 메모는 Description 에 해당합니다.',
        },
      },
      required: ['value'],
    },
  })
  @ApiOperation({
    summary: addMemoSummary,
    description: addMemoDescription,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: '성공여부',
        },
      },
      required: ['success'],
    },
  })
  @ApiNotFoundResponse({ description: StoryNotExistsError.message })
  async addStoryBoardMemo(
    @TsRestRequest() { params, body }: RequestShapes['addStoryBoardMemo'],
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes> {
    const arg = new PostStoryBoardMemoDto({ ...params, body });
    const result: Result<
      boolean,
      MemoNotExistsError | InternalServerErrorException
    > = await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof MemoNotExistsError)
          throw new NotFoundException(err.message);
        throw new InternalServerErrorException(err.message);
      },
    });
  }
}
