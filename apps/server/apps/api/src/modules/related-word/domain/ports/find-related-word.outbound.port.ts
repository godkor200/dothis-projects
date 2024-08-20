import { KeywordRes, RelWordsEntity } from '@Libs/types';

export interface FindRelatedWordOutboundPort {
  findOneByKeyword: (option: string) => Promise<RelWordsEntity>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}
