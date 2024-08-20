import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKeywordInformationDto } from '@Apps/modules/related-word/application/dtos/get-keyword-information.dto';

import { GetKeywordInformationInboundPort } from '@Apps/modules/related-word/domain/ports/get-keyword-information.inbound.port';
import { Inject } from '@nestjs/common';
import { GET_KEYWORD_INFO_SERVICE } from '@Apps/modules/related-word/keyword.di-token.constant';
import { TGetKeywordInformationRes } from '@dothis/dto';
import { WeeklyViewsError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';
import { Result } from 'oxide.ts';
import { IRes } from '@Libs/types';

export type GetKeywordInformationResult = Result<
  IRes<TGetKeywordInformationRes>,
  WeeklyViewsError
>;
@QueryHandler(GetKeywordInformationDto)
export class GetKeywordInformationQueryHandler
  implements
    IQueryHandler<GetKeywordInformationDto, GetKeywordInformationResult>
{
  constructor(
    @Inject(GET_KEYWORD_INFO_SERVICE)
    private readonly GetKeywordInformationService: GetKeywordInformationInboundPort,
  ) {}
  async execute(
    dto: GetKeywordInformationDto,
  ): Promise<GetKeywordInformationResult> {
    return await this.GetKeywordInformationService.execute(dto);
  }
}
