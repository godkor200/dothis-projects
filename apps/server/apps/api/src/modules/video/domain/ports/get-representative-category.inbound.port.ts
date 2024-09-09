import { Result } from 'oxide.ts';
import { GetRepresenativeCategoryDto } from '@Apps/modules/video/application/dtos/get-represenative-category.dto';

export type TRepresentativeCategory = Result<
  {
    representativeCategory: number;
  },
  any
>;

export interface GetRepresentativeCategoryInboundPort {
  execute(dto: GetRepresenativeCategoryDto): Promise<TRepresentativeCategory>;
}
