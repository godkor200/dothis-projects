import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  Headers,
  Param,
  Body,
} from '@nestjs/common';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { nestControllerContract, TsRest, tsRestHandler } from '@ts-rest/nest';
import { apiRouter, TPostStoryBoardBody } from '@dothis/dto';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { CommandBus } from '@nestjs/cqrs';
import { StoryBoardEntity } from '@Apps/modules/story-board/domain/entities/story-board.entity';
import { match, Result } from 'oxide.ts';
import {
  PostStoryBoardBody,
  PostStoryBoardMainDraftDto,
  PostStoryBoardMainDto,
  RecentStoryBoardCreateDto,
  PostStoryBoardReferenceDto,
  PostStoryBoardMemoDto,
  PostStoryBoardMainParams,
  SuccessBase,
  PostStoryBoardOverviewDto,
  PostStoryBoardMemoParams,
} from '@Apps/modules/story-board/application/dtos';

import {
  StoryNotExistsError,
  ReferNotExistsError,
  MemoNotExistsError,
  NotFoundErr,
} from '@Apps/modules/story-board/domain/events/errors';
import { StoryBoardCreateRes } from '@Apps/modules/story-board/domain/events/response';
import { AuthToken } from '@Apps/common/auth/domain/event/auth.event';

import {
  InternalServerErr,
  UnauthorizedErr,
} from '@Apps/common/auth/domain/event/auth.error';
import { TStoryBoardDraftRes } from '@Apps/modules/story-board/application/commands/post-story-board-draft.command';

import { TPostStoryBoardTitleCommandRes } from '@Apps/modules/story-board/application/commands/post-story-board-title.command';
import { OverviewParams } from '@Apps/modules/story-board/domain/events/request';
import { TOverviewRes } from '@Apps/modules/story-board/application/commands/post-story-board-overview.command';
import { TPostStoryBoardReferenceRes } from '@Apps/modules/story-board/application/commands/post-reference.command';
import { TPostMemoCommand } from '@Apps/modules/story-board/application/commands/post-memo.command';

const c = nestControllerContract(apiRouter.storyBoard);
const {
  createStoryBoard,
  addStoryBoardOverviews,
  updateStoryBoardTitle,
  addStoryBoardReference,
  addStoryBoardMemo,
  updateStoryBoardDraft,
} = c;

const { summary: createSummary, description: createDescription } =
  createStoryBoard;
const { summary: addDetailSummary, description: addDetailDescription } =
  addStoryBoardOverviews;
const { summary: updateTitleSummary, description: updateTitleDescription } =
  updateStoryBoardTitle;
const { summary: addReferenceSummary, description: addReferenceDescription } =
  addStoryBoardReference;
const { summary: addMemoSummary, description: addMemoDescription } =
  addStoryBoardMemo;
const { summary: updateDraftSummary, description: updateDraftDescription } =
  updateStoryBoardDraft;

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
  @ApiCreatedResponse({ type: StoryBoardCreateRes })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  async createStoryBoard(
    @User() userInfo: UserInfoCommandDto,
    @Headers() headers: AuthToken,
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
  @ApiOperation({
    summary: updateDraftSummary,
    description: updateDraftDescription,
  })
  @ApiCreatedResponse({ type: SuccessBase })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  async toggleAutoSave(
    @User() userInfo: UserInfoCommandDto,
    @Param() params: PostStoryBoardMainParams,
    @Body() body: TPostStoryBoardBody,
    @Headers() headers: AuthToken,
  ) {
    return tsRestHandler(updateStoryBoardDraft, async ({ params, body }) => {
      const command = new PostStoryBoardMainDraftDto({
        ...params,
        body,
      });

      const result: TStoryBoardDraftRes = await this.commandBus.execute(
        command,
      );
      return match<TStoryBoardDraftRes, TTsRestRes<IRes<boolean>>>(result, {
        Ok: (result) => ({
          status: 201,
          body: {
            success: result.success,
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

  @TsRest(updateStoryBoardTitle)
  @ApiOperation({
    summary: updateTitleSummary,
    description: updateTitleDescription,
  })
  @ApiCreatedResponse({ type: SuccessBase })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  async updateStoryBoardTitle(
    @Body() body: PostStoryBoardBody,
    @Param() param: PostStoryBoardMainParams,
    @Headers() headers: AuthToken,
  ) {
    return tsRestHandler(updateStoryBoardTitle, async ({ params, body }) => {
      const arg = new PostStoryBoardMainDto({
        ...params,
        body,
      });

      const result: TPostStoryBoardTitleCommandRes =
        await this.commandBus.execute(arg);
      return match<TPostStoryBoardTitleCommandRes, TTsRestRes<IRes<boolean>>>(
        result,
        {
          Ok: (result) => ({ status: 201, body: { success: result.success } }),
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

  @TsRest(addStoryBoardOverviews)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: addDetailSummary,
    description: addDetailDescription,
  })
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
  @ApiCreatedResponse({ type: SuccessBase })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  @ApiNotFoundResponse({ type: NotFoundErr })
  async addStoryBoardOverviews(
    @User() userInfo: UserInfoCommandDto,
    @Headers() headers: AuthToken,
    @Param() param: OverviewParams,
  ) {
    return tsRestHandler(addStoryBoardOverviews, async ({ params, body }) => {
      const arg = new PostStoryBoardOverviewDto({ ...params, body });
      const result: TOverviewRes = await this.commandBus.execute(arg);
      return match<TOverviewRes, TTsRestRes<IRes<boolean>>>(result, {
        Ok: (result) => ({ status: 201, body: { success: result.success } }),
        Err: (err: Error) => {
          if (err instanceof StoryNotExistsError)
            throw new NotFoundException(err.message);
          throw new InternalServerErrorException(err.message);
        },
      });
    });
  }

  @TsRest(addStoryBoardReference)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: addReferenceSummary,
    description: addReferenceDescription,
  })
  @ApiCreatedResponse({ type: SuccessBase })
  @ApiNotFoundResponse({ type: NotFoundErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  async addStoryBoardReference(
    @User() userInfo: UserInfoCommandDto,
    @Param() params: PostStoryBoardMainParams,
    @Body() body: PostStoryBoardBody,
    @Headers() headers: AuthToken,
  ) {
    return tsRestHandler(addStoryBoardReference, async ({ params, body }) => {
      const command = new PostStoryBoardReferenceDto({ ...params, body });
      const result: TPostStoryBoardReferenceRes = await this.commandBus.execute(
        command,
      );
      return match<TPostStoryBoardReferenceRes, TTsRestRes<IRes<boolean>>>(
        result,
        {
          Ok: (result) => ({ status: 201, body: result }),
          Err: (err: Error) => {
            if (err instanceof ReferNotExistsError)
              throw new NotFoundException(err.message);
            throw new InternalServerErrorException(err.message);
          },
        },
      );
    });
  }

  @TsRest(addStoryBoardMemo)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: addMemoSummary,
    description: addMemoDescription,
  })
  @ApiCreatedResponse({ type: SuccessBase })
  @ApiNotFoundResponse({ type: NotFoundErr })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  @ApiInternalServerErrorResponse({ type: InternalServerErr })
  async addStoryBoardMemo(
    @User() userInfo: UserInfoCommandDto,
    @Headers() headers: AuthToken,
    @Param() params: PostStoryBoardMemoParams,
    @Body() body: TPostStoryBoardBody,
  ) {
    return tsRestHandler(addStoryBoardMemo, async ({ params, body }) => {
      const arg = new PostStoryBoardMemoDto({ ...params, body });
      const result: TPostMemoCommand = await this.commandBus.execute(arg);
      return match<TPostMemoCommand, TTsRestRes<IRes<boolean>>>(result, {
        Ok: (result) => ({ status: 201, body: { success: result } }),
        Err: (err: Error) => {
          if (err instanceof MemoNotExistsError)
            throw new NotFoundException(err.message);
          throw new InternalServerErrorException(err.message);
        },
      });
    });
  }
}
