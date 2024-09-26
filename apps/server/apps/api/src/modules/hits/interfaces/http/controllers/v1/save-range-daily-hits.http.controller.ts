import { Controller, Body, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { CommandBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto'; // Replace with actual module name and path
import { IRes, TTsRestRes } from '@Libs/types';
import {
  SaveRangeDailyHitsDto,
  SaveRangeDailyHitQuery,
} from '@Apps/modules/hits/application/dtos/save-range-daily-hits.dto';
import { SuccessBase } from '@Apps/modules/story-board/application/dtos';
import { TSaveResult } from '@Apps/modules/hits/application/services/save-daily-hits.service';

const c = nestControllerContract(apiRouter.hits);
const { saveRangeDailyHits } = c; // Assuming this is defined in your API router contract
const { summary, description } = saveRangeDailyHits;

@ApiTags('조회수')
@Controller()
export class SaveRangeDailyHitsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRestHandler(saveRangeDailyHits)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: SuccessBase })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(@Query() query: SaveRangeDailyHitQuery) {
    return tsRestHandler(saveRangeDailyHits, async () => {
      const command = new SaveRangeDailyHitsDto(query);

      const result: TSaveResult = await this.commandBus.execute(command);

      return match<TSaveResult, TTsRestRes<IRes>>(result, {
        Ok: (res) => ({
          status: 200,
          body: { success: res.success },
        }),
        Err: (err: Error) => {
          throw err;
        },
      });
    });
  }
}
