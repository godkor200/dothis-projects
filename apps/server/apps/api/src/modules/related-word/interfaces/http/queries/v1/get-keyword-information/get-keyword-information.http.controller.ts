import { IQuery, QueryBus } from '@nestjs/cqrs';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, TGetKeywordInformationRes } from '@dothis/dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Param } from '@nestjs/common';
import {
  GetKeywordInformationDto,
  GetKeywordInformationQuery,
} from '@Apps/modules/related-word/application/dtos/get-keyword-information.dto';
import { match } from 'oxide.ts';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { GetKeywordInformationResult } from '@Apps/modules/related-word/application/queries/get-keyword-information.query-handler';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
const c = nestControllerContract(apiRouter.relatedWords);
const { getKeywordInformation } = c;

const { responses, description, summary } = getKeywordInformation;
export class GetKeywordInformationRes extends createZodDto(
  extendApi(responses[200]),
) {}
@ApiTags('탐색어')
@Controller()
export class GetKeywordInformationHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getKeywordInformation)
  @ApiOperation({
    summary,
    description,
    responses,
  })
  @ApiOkResponse({ type: GetKeywordInformationRes })
  async execute(@Param() params: GetKeywordInformationQuery) {
    const dto = new GetKeywordInformationDto(params);

    const result: GetKeywordInformationResult = await this.queryBus.execute(
      dto,
    );

    return match<
      GetKeywordInformationResult,
      TTsRestRes<IRes<TGetKeywordInformationRes>>
    >(result, {
      Ok: (result) => ({
        status: 200,
        body: result,
      }),
      Err: (err: Error) => {
        throw err;
      },
    });
  }
}
