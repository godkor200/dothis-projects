export class TopVideoDao {
  search: string;
  related: string;
  from: string;
  to: string;

  constructor(search: string, related: string, from: string, to: string) {
    this.search = search;
    this.related = related;
    this.from = from;
    this.to = to;
  }
}
