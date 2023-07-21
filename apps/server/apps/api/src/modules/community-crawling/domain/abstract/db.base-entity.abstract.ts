export abstract class DbBaseEntityAbstract<T = number> {
  abstract id: T;

  abstract crawlUpdateAt: Date;
}