import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetCategoryDistributionDto,
  GetCategoryDistributionResult,
} from '@Apps/modules/hits/application/dtos/category-distribution.dto';
import { Err, Ok, Result } from 'oxide.ts';
import dayjs from 'dayjs';
import { CategoryDistributionOutbound } from '@Apps/modules/hits/domain/ports/category-distribution.outbound.port';
import { Inject } from '@nestjs/common';
import { CATEGORY_DISTRIBUTION_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';

export type CategoryDistributionResult = Result<
  GetCategoryDistributionResult,
  any
>;

@QueryHandler(GetCategoryDistributionDto)
export class CategoryDistributionService
  implements
    IQueryHandler<GetCategoryDistributionDto, CategoryDistributionResult>
{
  constructor(
    @Inject(CATEGORY_DISTRIBUTION_DI_TOKEN)
    private readonly categoryAnalysisAdapter: CategoryDistributionOutbound,
  ) {}

  async execute(
    dto: GetCategoryDistributionDto,
  ): Promise<CategoryDistributionResult> {
    const { from, to } = dto;

    const adjustedFrom = dayjs(from).subtract(1, 'day').format('YYYY-MM-DD');

    const adjustedDto = { ...dto, from: adjustedFrom };

    try {
      const res = await this.categoryAnalysisAdapter.execute(adjustedDto);
      console.log(res);
      return Ok(res.unwrap());
    } catch (e) {
      return Err(e);
    }
  }
}
