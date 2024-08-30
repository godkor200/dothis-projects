export class SubscriberViewsDao {
  search: string;
  related: string;
  to: string;

  constructor(search: string, related: string, to: string) {
    this.search = search;
    this.related = related;
    this.to = to;
  }
}
