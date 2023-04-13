export interface IdBaseEntityInterface<T = number> {
  id: T | undefined;

  crawlUpdateAt: Date;
}
