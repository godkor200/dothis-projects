import { z } from 'zod';
import { c } from '../contract';
import {
  zAutoCompleteWords,
  zKeywords,
  zRankRel,
  zRelWords,
  zSearch,
} from './rel-words.model';
import { zErrResBase } from '../error.response.zod';

export const relWordsApiUrl = '/related-word';
export const keywordApiUrl = '/keyword';
export const relatedWordsApi = c.router({
  getKeyword: {
    method: 'GET',
    path: `${keywordApiUrl}`,
    responses: {
      200: zKeywords,
      ...zErrResBase,
    },
    summary: '탐색어를 전부 가져옵니다.',
    description: '탐색어를 전부 가져옵니다.',
  },
  getRelWords: {
    method: 'GET',
    path: `${relWordsApiUrl}/:keyword`,
    responses: {
      200: zRelWords,
      ...zErrResBase,
    },
    summary: '키워드를 가지고 관련어를 가져옵니다.',
    description: '키워드를 가지고 관련어를 가져옵니다.',
  },
  updateAutoCompleteWords: {
    method: 'PUT',
    path: `${relWordsApiUrl}`,
    responses: {
      200: zRelWords,
      ...zErrResBase,
    },
    body: z.object({}),
    summary: '자동완성 단어를 업데이트 합니다.',
    description: '자동완성 단어를 업데이트 합니다.',
  },
  getAutoCompleteWords: {
    method: 'GET',
    path: `/auto-complete/:word`,
    responses: {
      200: zAutoCompleteWords,
      ...zErrResBase,
    },
    pathParams: z.object({ word: z.string() }),
    summary: '자동완성 단어를 가져옵니다.',
    description:
      '자동완성 단어를 가져옵니다. 뒤에 * 붙어있는 단어는 완전단어로 우리 디비에 탐색어로 등록되있는 단어를 뜻합니다.',
  },
  rankingRelatedWords: {
    method: 'GET',
    path: `${relWordsApiUrl}/:search/ranking`,
    responses: {
      200: zRankRel,
      ...zErrResBase,
    },
    //pathParams: zSearch,
    summary: '탐색어로 연관어를 기대조회수를 매깁니다.',
    description: '탐색어로 연관어의 기대조회수를 리턴합니다.',
  },
});
