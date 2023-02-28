import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/cashe/v1/queries/find-dic-term/find-dic-term.query';

@QueryHandler(FindDicTermQuery)
export class FindDicTermHandler
  implements IQueryHandler<FindDicTermQuery, any>
{
  execute(query: FindDicTermQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
