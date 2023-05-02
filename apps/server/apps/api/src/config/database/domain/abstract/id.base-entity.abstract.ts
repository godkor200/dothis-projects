import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { DbBaseEntityAbstract } from 'apps/api/src/config/database/domain/abstract/db.base-entity.abstract';
import { IdBaseEntityInterface } from 'apps/api/src/config/database/domain/abstract/id.base-entity.interface';

export class IdBaseEntityAbstract
  extends DbBaseEntityAbstract
  implements IdBaseEntityInterface
{
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'crawl_update_at' })
  crawlUpdateAt: Date;
}
