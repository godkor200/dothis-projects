import { GetKeywordInformationInboundPort } from '@Apps/modules/related-word/domain/ports/get-keyword-information.inbound.port';
import { GetKeywordInformationDto } from '@Apps/modules/related-word/application/dtos/get-keyword-information.dto';
import { GetKeywordInformationResult } from '@Apps/modules/related-word/application/queries/get-keyword-information.query-handler';
import { WeeklyHitsV2OutboundPort } from '@Apps/modules/hits/domain/ports/weekly-hits.v2.outbound.port';
import { Err, Ok } from 'oxide.ts';
import { WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN } from '@Apps/modules/hits/hits.di-token.contants';
import { Inject } from '@nestjs/common';

export class GetKeywordInformationService
  implements GetKeywordInformationInboundPort
{
  constructor(
    @Inject(WEEKLY_VIEWS_REPOSITORY_V2_DI_TOKEN)
    private readonly keywordRepository: WeeklyHitsV2OutboundPort,
  ) {}
  async execute(
    dto: GetKeywordInformationDto,
  ): Promise<GetKeywordInformationResult> {
    const res = await this.keywordRepository.getKeyword(dto.search);
    if (res.isOk()) {
      return Ok({ success: true, data: res.unwrap() });
    }
    return Err(res.unwrapErr());
  }
}
