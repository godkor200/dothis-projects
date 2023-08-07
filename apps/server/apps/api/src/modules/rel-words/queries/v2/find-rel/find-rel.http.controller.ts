import { Controller, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { FindRelRequestDto } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.request.dto';
import { FindRelQuery } from '@Apps/modules/rel-words/queries/dtos/find-rel.dto';
const c = nestControllerContract(apiRouter.relwords);
const { getRelWords } = c;
const { responses, description, summary } = getRelWords;

@ApiTags('연관어')
@Controller()
export class FindRelHttpV2Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getRelWords)
  async execute(@Param() queryParams: FindRelRequestDto) {
    // return await this.queryBus.execute(new FindRelQuery(queryParams));
  }
}
