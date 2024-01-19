import { Column, PrimaryGeneratedColumn } from 'typeorm';
export abstract class DbBaseEntityAbstract<T = number> {
  abstract id: T;

  abstract crawlUpdateAt: Date;
}
export class IdBaseEntityAbstract
  extends DbBaseEntityAbstract
  implements IdBaseEntityInterface
{
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'crawl_update_at' })
  crawlUpdateAt: Date;
}

export interface IdBaseEntityInterface<T = number> {
  id: T | undefined;

  crawlUpdateAt: Date;
}
