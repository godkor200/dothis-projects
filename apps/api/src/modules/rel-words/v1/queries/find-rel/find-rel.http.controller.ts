import { Controller, Param } from '@nestjs/common';
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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindRelQuery } from './find-rel.query-handler';

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
  @ApiOkResponse({
    description: `데이터를 보냅니다.`,
  })
  @ApiConflictResponse({
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(
    @Param() queryParams: FindRelRequestDto,
    // @Cookies() cookie: { access_token: string },
  ) {
    return await this.queryBus.execute(new FindRelQuery(queryParams));
  }
}
