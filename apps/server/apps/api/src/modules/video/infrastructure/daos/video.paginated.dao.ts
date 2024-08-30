import { TSqlParam } from '@Apps/modules/story-board/infrastructure/daos/story-board.dao';

export class VideoPaginatedDao {
  search: string;
  related: string;
  from: string;
  to: string;
  sort: string;
  order: TSqlParam;
  limit: string;
  page?: string;

  constructor(props: {
    search: string;
    related: string;
    from: string;
    to: string;
    sort: string;
    order: TSqlParam;
    limit: string;
    page: string;
  }) {
    this.search = props.search;
    this.related = props.related;
    this.from = props.from;
    this.to = props.to;
    this.sort = props.sort;
    this.order = props.order;
    this.limit = props.limit;
    this.page = props.page;
  }
}
