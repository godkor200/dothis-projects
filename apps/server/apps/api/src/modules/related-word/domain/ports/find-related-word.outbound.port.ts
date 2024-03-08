import {
  KeywordRes,
  RelWordsEntity,
} from '@Libs/commons/src/interfaces/types/res.types';

export interface FindRelatedWordOutboundPort {
  findOneByKeyword: (option: string) => Promise<RelWordsEntity>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}
