import { SqlRepositoryBase } from '@Libs/commons/db/sql-repository.base';
import { RelatedWordModel, zRelWords } from '@dothis/dto';
import {
  RelatedWordsRepositoryFindOneByKeywordRes,
  RelatedWordsRepositoryPort,
} from './rel-words.repository.port';
import { RelatedWordsEntity } from '../entity/related_words.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Err, Ok, Result } from 'oxide.ts';
import { ZodObject } from 'zod';

import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

export class RelatedWordsRepository
  extends SqlRepositoryBase<RelatedWordsEntity, RelatedWordModel>
  implements RelatedWordsRepositoryPort
{
  @InjectRepository(RelatedWordsEntity)
  protected repository: Repository<RelatedWordsEntity>;
  protected tableName = 'related_words';
  protected schema: ZodObject<any> = zRelWords;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findOneByKeyword(
    keyword: string,
  ): Promise<RelatedWordsRepositoryFindOneByKeywordRes> {
    try {
      const res = await this.repository
        .createQueryBuilder(this.tableName)
        .where({ keyword })
        .getOne();

      if (!res) return Err(new KeywordsNotFoundError());
      return Ok(res);
    } catch (e) {
      return Err(e);
    }
  }

  async findAllKeyword(): Promise<{ keyword: string }[]> {
    return await this.repository
      .createQueryBuilder(this.tableName)
      .select('keyword')
      .execute();
  }
}
