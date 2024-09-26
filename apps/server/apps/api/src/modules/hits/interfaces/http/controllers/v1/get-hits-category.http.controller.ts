import { QueryBus } from '@nestjs/cqrs';
import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { match } from 'oxide.ts';
import { IRes } from '@Libs/types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import {
  GetCategoryDistributionDto,
  GetCategoryDistributionQuery,
  GetCategoryDistributionResult,
} from '@Apps/modules/hits/application/dtos/category-distribution.dto';
import { apiRouter } from '@dothis/dto';
import { ExternalAiServerError } from '@Apps/modules/related-word/domain/errors/related-words.errors';

const { getCategoryDistribution } = nestControllerContract(apiRouter.hits);
const { summary, description } = getCategoryDistribution;

@ApiTags('카테고리')
@Controller()
export class CategoryDistributionController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getCategoryDistribution)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({ type: [GetCategoryDistributionResult] })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async execute(
    @Query() query: GetCategoryDistributionQuery,
  ): Promise<IRes<GetCategoryDistributionResult[]>> {
    const arg = new GetCategoryDistributionDto(query);

    const result = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (distributionResults) => ({
        success: true,
        data: distributionResults,
      }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        if (err instanceof ExternalAiServerError) {
          throw new InternalServerErrorException(err.message);
        }
        throw new InternalServerErrorException(
          'Internal error occurred',
          err.message,
        );
      },
    });
  }
}
