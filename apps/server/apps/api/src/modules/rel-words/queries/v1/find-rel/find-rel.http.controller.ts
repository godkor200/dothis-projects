import { Controller, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindRelRequestDto } from './find-rel.request.dto';
import { apiRouter } from '@dothis/dto';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
const c = nestControllerContract(apiRouter.relwords);
const { getRelWords } = c;
const { responses, description, summary } = getRelWords;
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FindRelV1Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';
import { IRes } from '@Libs/commons/src/types/res.types';
import { RelwordsRes } from '@Libs/commons/src/types/dto.types';
import { match, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/rel-words/domain/relwords.errors';

@ApiTags('연관어')
@ApiCookieAuth()
@Controller()
export class FindRelHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getRelWords)
  @ApiOperation({
    summary,
    description,
  })
  @ApiParam({
    name: 'keyword',
  })
  @ApiOkResponse({
    description: `해당하는 데이터를 보냅니다.`,
    type: RelwordsRes,
  })
  @ApiConflictResponse({
    description: responses[401],
  })
  @ApiNotFoundResponse({
    description: RelwordsNotFoundError.message,
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(
    @Param() queryParams: FindRelRequestDto,
  ): Promise<IRes<RelwordsRes>> {
    const result: Result<RelwordsRes, RelwordsNotFoundError> =
      await this.queryBus.execute(new FindRelV1Query(queryParams));

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err) => {
        if (err instanceof RelwordsNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}
