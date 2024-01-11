import { KeywordRes, RelWordsEntity } from '@Libs/commons/src/types/res.types';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelWordsEntity>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}
