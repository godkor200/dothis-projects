import { KeywordRes, RelWordsEntity } from '@Libs/types';
import { Result } from 'oxide.ts';
import {
  ExternalAiServerError,
  RelatedClusterNotFoundError,
} from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { AiRelatedWordsResult } from '@Apps/modules/related-word/infrastructure/adapters/get-related-word.adapter';

export interface FindRelatedWordOutboundPort {
  findOneByKeyword: (option: string) => Promise<RelWordsEntity>;

  findAllKeyword: () => Promise<KeywordRes[]>;
}

/**
 * response:{
 *   "code": 200,
 *   "message": "success",
 *   "data": AiRelatedWordsResult[]
 * }
 */
export type GetRelatedWordOutboundPortRes = Result<
  AiRelatedWordsResult[],
  ExternalAiServerError
>;

export type GetRelatedWordsNotFoundError = Result<
  string[],
  RelatedClusterNotFoundError
>;

export interface GetRelatedWordOutboundPort {
  execute(search: string): Promise<GetRelatedWordOutboundPortRes>;
}

export interface GetRelatedClusterOutboundPort {
  execute(search: string): Promise<GetRelatedWordsNotFoundError>;
}
