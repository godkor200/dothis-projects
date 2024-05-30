import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRankingRelatedWordsV2Dto } from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { Inject } from '@nestjs/common';
import { RANKING_V2_SERVICE_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { GetRankingRelatedWordsV2Service } from '@Apps/modules/related-word/application/service/get-ranking-related-words.v2.service';
import { TGetRankingRelatedWordsRes } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';

@QueryHandler(GetRankingRelatedWordsV2Dto)
export class GetRankingV2QueryHandler
  implements
    IQueryHandler<GetRankingRelatedWordsV2Dto, TGetRankingRelatedWordsRes>
{
  constructor(
    @Inject(RANKING_V2_SERVICE_DI_TOKEN)
    private readonly getRankingRelatedWordsV2Service: GetRankingRelatedWordsV2Service,
  ) {}

  async execute(dto: GetRankingRelatedWordsV2Dto) {
    return this.getRankingRelatedWordsV2Service.execute(dto);
  }
}
