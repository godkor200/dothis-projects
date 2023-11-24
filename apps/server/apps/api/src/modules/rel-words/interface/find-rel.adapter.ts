import { KeywordRes, RelwordsRes } from '@Libs/commons/src/types/dto.types';

export interface FindRelAdapter {
  findOneByKeyword: (option: string) => Promise<RelwordsRes>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}
