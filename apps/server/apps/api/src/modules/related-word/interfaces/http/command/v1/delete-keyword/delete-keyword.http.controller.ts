import {
  DeleteKeyWordCommandDto,
  DeleteKeyWordParams,
  DeleteKeyWordSuccessBase,
} from '@Apps/modules/related-word/application/dtos/delete-key-word.dto';
import { InternalServerErr } from '@Apps/modules/related-word/application/dtos/delete-rel-words.dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { JwtAccessGuard } from '@Libs/commons/src';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';
import { relatedWordsApi } from '@dothis/dto';
import {
  Body,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { TDeleteKeyWordCommandHandlerRes } from './delete-key-word.command-handler';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';

@ApiTags('탐색어')
@Controller()
export class DeleteKeyWordHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  @UseGuards(JwtAccessGuard, IsAdminGuard)
  @ApiOperation({
    summary: relatedWordsApi.deleteKeyWord.summary,
    description: relatedWordsApi.deleteKeyWord.description,
  })
  @ApiOkResponse({
    type: DeleteKeyWordSuccessBase,
  })
  @ApiNotFoundResponse({
    description: '없는 키워드 삭제할 때',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @TsRestHandler(relatedWordsApi.deleteKeyWord)
  async execute(@Param() param: DeleteKeyWordParams) {
    return tsRestHandler(
      relatedWordsApi.deleteKeyWord,
      async ({ params, body: reqBody }) => {
        const command = new DeleteKeyWordCommandDto(params.id);

        const res = await this.commandBus.execute(command);

        return match<TDeleteKeyWordCommandHandlerRes, TTsRestRes<IRes<void>>>(
          res,
          {
            Ok: (res) => ({
              status: 201,
              body: {
                success: true,
                data: res,
              },
            }),
            Err: (err: Error) => {
              if (err instanceof KeywordsNotFoundError) {
                throw new NotFoundException(err.message);
              }
              throw err;
            },
          },
        );
      },
    );
  }
}
