import { IQuery, QueryBus } from '@nestjs/cqrs';
import { Controller, NotFoundException } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, TKeyword } from '@dothis/dto';
import { IRes } from '@Libs/commons/src/types/res.types';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { KeywordsNotFoundError } from '@Apps/modules/rel-words/domain/keywords.errors';
const c = nestControllerContract(apiRouter.relwords);
const { getKeyword } = c;
const { summary, description, responses } = getKeyword;

export class KeywordQueryDto implements IQuery {}

@ApiTags('탐색어')
@Controller()
export class FindSearchKeywordHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getKeyword)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({
    description: KeywordsNotFoundError.message,
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(): Promise<IRes<string[]>> {
    const arg = new KeywordQueryDto();
    const result = await this.queryBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof KeywordsNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}