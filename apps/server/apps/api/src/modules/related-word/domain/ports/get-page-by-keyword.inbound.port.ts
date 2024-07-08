import { GetPageByKeywordDto } from '@Apps/modules/related-word/application/dtos/get-page-by-keyword.dto';
import { GetPageByKeywordResult } from '@Apps/modules/related-word/application/queries/get-page-by-keyword.query-handler';

export interface GetPageByKeywordInboundPort {
  execute(query: GetPageByKeywordDto): Promise<GetPageByKeywordResult>;
}
