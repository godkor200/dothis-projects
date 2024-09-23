import { GetCategoryDistributionDto } from '@Apps/modules/hits/application/dtos/category-distribution.dto';

export class CategoryDistributionDao extends GetCategoryDistributionDto {
  constructor(props: GetCategoryDistributionDto) {
    super();
    Object.assign(this, props);
  }
}
