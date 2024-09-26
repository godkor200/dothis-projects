export class VideoDurationLengthDao {
  search: string;
  related: string;

  constructor(search: string, related: string) {
    this.search = search;
    this.related = related;
  }
}
