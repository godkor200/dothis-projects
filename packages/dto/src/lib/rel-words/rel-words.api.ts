import { z } from 'zod';
import { c } from '../contract';
import { zAutoCompleteWords, zKeywords, zRelWords } from './rel-words.model';

export const relWordsApiUrl = '/rel-words';
export const keywordApiUrl = '/key-words';
export const relWordsApi = c.router({
  getKeyword: {
    method: 'GET',
    path: `${keywordApiUrl}`,
    responses: {
      200: zKeywords,
      404: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다. internel server errors',
    },
    summary: '탐색어를 전부 가져옵니다.',
    description: '탐색어를 전부 가져옵니다.',
  },
  getRelWords: {
    method: 'GET',
    path: `${relWordsApiUrl}/:keyword`,
    responses: {
      200: zRelWords,
      404: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '키워드를 가지고 관련어를 가져옵니다.',
    description: '키워드를 가지고 관련어를 가져옵니다.',
  },
  updateAutoCompleteWords: {
    method: 'PUT',
    path: `${relWordsApiUrl}`,
    responses: {
      200: 'success',
      404: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    body: {},
    summary: '자동완성 단어를 업데이트 합니다.',
    description: '자동완성 단어를 업데이트 합니다.',
  },
  getAutoCompleteWords: {
    method: 'GET',
    path: `/auto-complete/:word`,
    responses: {
      200: zAutoCompleteWords,
      404: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    pathParams: z.object({ word: z.string() }),
    summary: '자동완성 단어를 가져옵니다.',
    description:
      '자동완성 단어를 가져옵니다. 뒤에 * 붙어있는 단어는 완전단어로 우리 디비에 탐색어로 등록되있는 단어를 뜻합니다.',
  },
  rankRel: {
    method: 'GET',
    path: `${relWordsApiUrl}/rank/:keyword`,
    responses: {
      200: 'success',
      404: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    pathParams: z.object({ keyword: z.string() }),
    summary: '탐색어로 연관어를 기대조회수를 매깁니다.',
    description: '탐색어로 연관어의 기대조회수를 리턴합니다.',
  },
});
