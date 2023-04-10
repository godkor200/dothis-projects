import { z } from 'zod';
import { c } from '../contract';
import { zRelWords } from './rel-words.model';

export const relWordsApiUrl = '/rel-words';

export const relWordsApi = c.router({
  getRelWords: {
    method: 'GET',
    path: `${relWordsApiUrl}/:keyword`,
    responses: {
      200: zRelWords,
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '키워드를 가지고 관련어를 가져옵니다.',
    description: '키워드를 가지고 관련어를 가져옵니다.',
  },
});
