import { GetKeywordInformationDto } from '@Apps/modules/related-word/application/dtos/get-keyword-information.dto';
import { GetKeywordInformationResult } from '@Apps/modules/related-word/application/queries/get-keyword-information.query-handler';

export interface GetKeywordInformationInboundPort {
  execute(dto: GetKeywordInformationDto): Promise<GetKeywordInformationResult>;
}
