import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { DbBaseEntityAbstract } from '@Apps/modules/community-crawling/domain/abstract/db.base-entity.abstract';
import { IdBaseEntityInterface } from '@Apps/modules/community-crawling/domain/abstract/id.base-entity.interface';

export class IdBaseEntityAbstract
  extends DbBaseEntityAbstract
  implements IdBaseEntityInterface
{
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'crawl_update_at' })
  crawlUpdateAt: Date;
}
