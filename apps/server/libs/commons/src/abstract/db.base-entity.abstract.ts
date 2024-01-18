import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

export interface idBaseDateEntityInterface
  extends Pick<IdBaseEntityInterface, 'id'> {
  createdAt: Date;

  updatedAt: Date;
}

export class IdBaseDateEntityAbstract implements idBaseDateEntityInterface {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: '생성된 날짜',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: '수정된 날짜',
  })
  updatedAt: Date;
}
