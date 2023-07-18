import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class FindVideoQuery {
  readonly search: string;
  readonly related?: string;
  constructor(props: FindVideoQuery) {
    this.search = props.search;
    this.related = props.related;
  }
}

@QueryHandler(FindVideoQuery)
export class FindVideoHandler implements IQueryHandler<FindVideoQuery> {
  execute(query: FindVideoQuery): Promise<any> {
    return Promise.resolve(undefined);
  }
}
