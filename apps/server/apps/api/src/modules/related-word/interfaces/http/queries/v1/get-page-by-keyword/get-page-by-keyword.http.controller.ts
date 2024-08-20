import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import {
  GetPageByKeywordDto,
  GetPageByKeywordQuery,
} from '@Apps/modules/related-word/application/dtos/get-page-by-keyword.dto';
import { GetPageByKeywordResult } from '@Apps/modules/related-word/application/queries/get-page-by-keyword.query-handler';
import { match } from 'oxide.ts';
import { IRes, TTsRestRes } from '@Libs/types';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import { Controller, NotFoundException, Param } from '@nestjs/common';
import { TableNotFoundException } from '@Libs/commons';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
const c = nestControllerContract(apiRouter.relatedWords);
const { getPageBySearchKeyword } = c;

const { responses, description, summary } = getPageBySearchKeyword;
@ApiTags('탐색어')
@Controller()
export class GetPageByKeywordHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getPageBySearchKeyword)
  @ApiOperation({
    summary,
    description,
    responses,
  })
  @ApiOkResponse({
    description: `해당하는 키워드가 있는지 없는지 알려줍니다.`,
    type: Boolean,
  })
  @ApiNotFoundResponse({
    description: KeywordsNotFoundError.message,
  })
  async execute(@Param() params: GetPageByKeywordQuery) {
    const dto = new GetPageByKeywordDto(params);
    const result: GetPageByKeywordResult = await this.queryBus.execute(dto);

    return match<GetPageByKeywordResult, TTsRestRes<IRes<boolean>>>(result, {
      Ok: (result: boolean) => ({
        status: 200,
        body: {
          success: result,
        },
      }),
      Err: (err: Error) => {
        if (err instanceof VideoNotFoundError)
          throw new NotFoundException(err.message);
        if (err instanceof KeywordsNotFoundError)
          throw new NotFoundException(err.message);
        if (err instanceof TableNotFoundException)
          throw new InternalServerErrorException(err.message);
        throw err;
      },
    });
  }
}
