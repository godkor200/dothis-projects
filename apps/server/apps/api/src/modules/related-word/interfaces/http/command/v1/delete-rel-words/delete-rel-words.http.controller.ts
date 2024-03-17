import { Controller, NotFoundException, Param, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { RelatedWordModel, apiRouter, relatedWordsApi } from '@dothis/dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteRelWordsCommandDto } from '@Apps/modules/related-word/application/dtos/delete-rel-words.dto';
import { match } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { TDeleteRelWordsCommandHandlerRes } from './delete-rel-words.command-handler';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

@ApiTags('연관어')
@Controller()
export class DeleteRelWordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRestHandler(relatedWordsApi.deleteRelatedWords)
  async execute() {
    return tsRestHandler(
      relatedWordsApi.deleteRelatedWords,
      async ({ params, body: reqBody }) => {
        const command = new DeleteRelWordsCommandDto(
          params.id,
          reqBody.deleteRelWords,
        );

        const res = await this.commandBus.execute(command);

        return match<
          TDeleteRelWordsCommandHandlerRes,
          TTsRestRes<IRes<RelatedWordModel>>
        >(res, {
          Ok: (res) => ({
            status: 201,
            body: {
              success: true,
              data: res,
            },
          }),
          Err: (err: Error) => {
            if (
              err instanceof RelwordsNotFoundError ||
              err instanceof KeywordsNotFoundError
            ) {
              throw new NotFoundException(err.message);
            }
            throw err;
          },
        });
      },
    );
  }
}
