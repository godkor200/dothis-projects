import { GetWeeklyKeywordDto } from '@Apps/modules/hits/application/dtos/get-weekly-keyword.dto';
import { TGetWeeklyKeywordRes } from '@Apps/modules/hits/application/queries/get-weekly-keyword.query-handler';

export interface GetWeeklyKeywordInboundPort {
  execute(query: GetWeeklyKeywordDto): Promise<TGetWeeklyKeywordRes>;
}
