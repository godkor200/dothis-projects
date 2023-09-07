import { SqlRepositoryBase } from '@Libs/commons/src/db/sql-repository.base';
import { RelWordsModel, zRelWords } from '@dothis/dto';
import { RelatedWordsRepositoryPort } from './rel-words.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ZodObject } from 'zod';
import { RelatedWordsEntity } from '../entity/related_words.entity';
import dataSource from '@Libs/commons/src/migrations/dataSource';

export class RelatedWordsRepository
  extends SqlRepositoryBase<RelatedWordsEntity, RelWordsModel>
  implements RelatedWordsRepositoryPort
{
  @InjectRepository(RelatedWordsEntity)
  protected repository: Repository<RelatedWordsEntity>;
  protected tableName = 'related_words';
  protected schema: ZodObject<any> = zRelWords;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByKeyword(keyword: string): Promise<RelatedWordsEntity> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .where({ keyword })
      .getOne();
  }

  async findAllKeyword(): Promise<{ keyword: string }[]> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .select('keyword')
      .execute();
  }
}
