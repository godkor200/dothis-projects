import { KeywordRes, RelWordsEntity } from '@Libs/commons/src/types/dto.types';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelWordsEntity>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}
