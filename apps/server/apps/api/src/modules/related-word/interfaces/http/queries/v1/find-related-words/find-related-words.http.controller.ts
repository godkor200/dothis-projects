import { Controller, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RelWordsEntity, IRes } from '@Libs/types';
import { match, Result } from 'oxide.ts';
import {
  GetRelatedWordsDto,
  GetRelatedWordsParams,
} from '@Apps/modules/related-word/application/dtos/find-related-words.request.dto';
import { RelatedWordsNotFoundError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
const c = nestControllerContract(apiRouter.relatedWords);
const { getRelWords } = c;
const { responses, description, summary } = getRelWords;

@ApiTags('연관어')
@ApiCookieAuth()
@Controller()
export class FindRelatedWordsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getRelWords)
  @ApiOperation({
    summary,
    description,
    responses,
  })
  @ApiOkResponse({
    description: `해당하는 데이터를 보냅니다.`,
    type: RelWordsEntity,
  })
  @ApiNotFoundResponse({
    description: RelatedWordsNotFoundError.message,
  })
  async execute(
    @Param() queryParams: GetRelatedWordsParams,
  ): Promise<IRes<RelWordsEntity>> {
    const result: Result<RelWordsEntity, RelatedWordsNotFoundError> =
      await this.queryBus.execute(new GetRelatedWordsDto(queryParams));

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err) => {
        if (err instanceof RelatedWordsNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}
