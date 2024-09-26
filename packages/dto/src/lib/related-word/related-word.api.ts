import { z } from 'zod';
import { c } from '../contract';
import {
  zAutoCompleteWords,
  zDeleteRelWords,
  zGetKeywordInformationRes,
  zKeywords,
  zRankingRelatedWordsRes,
  zRankRel,
  zRelWords,
  zSearch,
} from './related-word.model';
import { zErrResBase } from '../error.response.zod';
import { zSuccessBase } from '../success.response.zod';
import { zWord } from './related-word.zod';

export const searchWordBaseApiUrl = '/search-word';
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
    path: `${relWordsApiUrl}/:search`,
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
    pathParams: zWord,
    summary: '자동완성 단어를 가져옵니다.',
    description:
      '자동완성 단어를 가져옵니다. 사용자의 사용빈도가 많은순으로 업데이트 됩니다.',
  },

  incrementScoreWords: {
    method: 'POST',
    path: `/auto-complete/increment-score`,
    responses: {
      200: zAutoCompleteWords,
      ...zErrResBase,
    },
    body: zWord,
    summary: '자동완성 단어의 사용빈도를 업데이트',
    description: '자동완성 단어의 사용빈도를 업데이트 합니다.',
  },
  rankingRelatedWords: {
    method: 'GET',
    path: `${relWordsApiUrl}/:search/ranking`,
    responses: {
      200: zRankingRelatedWordsRes,
      ...zErrResBase,
    },
    pathParams: zSearch,
    summary: '탐색어로 연관어를 기대조회수를 매깁니다.',
    description: '탐색어로 연관어의 기대조회수를 리턴합니다.',
  },

  deleteRelatedWords: {
    method: 'DELETE',
    path: `${relWordsApiUrl}/:id`,
    body: zDeleteRelWords,
    pathParams: z.object({ id: z.string() }),
    responses: { 200: zSuccessBase, ...zErrResBase },
    summary: '입력으로 들어온 연관어를 삭제합니다.',
    description: '입력으로 들어온 연관어를 삭제합니다.',
  },
  setDicTerm: {
    method: 'GET',
    path: `${searchWordBaseApiUrl}/term-update`,
    responses: {
      200: c.type<any>(),
      401: c.type<{ message: string }>(),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    summary:
      '탐색어를 redis에 업데이트 하기위해 크롤링서버에서 http 요청을 받습니다.',
    description: 'http 요청을 받아 자동으로 redis에 업데이트합니다.',
  },
  getDicTerm: {
    method: 'GET',
    path: `${searchWordBaseApiUrl}/term`,
    query: z.object({ key: z.string().default('dic-term') }),
    responses: {
      200: c.type<any>(),
      401: c.type<{ message: string }>(),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    summary: '탐색어를 redis에서 불러옵니다.',
    description: '탐색어를 redis에서 불러옵니다.',
  },
  deleteKeyWord: {
    method: 'DELETE',
    path: `${keywordApiUrl}/:id`,
    body: z.object({}),
    pathParams: z.object({ id: z.string() }),
    responses: { 200: zSuccessBase, ...zErrResBase },
    summary: '탐색어 삭제',
    description: 'related_words 테이블 id에 맞는 행 한줄 삭제',
  },
  getPageBySearchKeyword: {
    method: 'GET',
    path: `${keywordApiUrl}/:search`,
    pathParams: zSearch,
    responses: {
      200: zKeywords,
      ...zErrResBase,
    },
    summary: '해당하는 탐색어가 있는지 호출합니다.',
    description:
      '해당하는 탐색어가 우리가 탐색한 db안에 있는지 없는지 호출합니다.',
  },
  getKeywordInformation: {
    method: 'GET',
    path: `${keywordApiUrl}/:search/information`,
    pathParams: zSearch,
    responses: {
      200: zGetKeywordInformationRes,
      ...zErrResBase,
    },
    summary: '키워드 인포 API 호출합니다.',
    description:
      '기능 개요\n' +
      '\n' +
      '- 검색 키워드\n' +
      '    - 입력된 키워드 표시\n' +
      '    - 최대 10글자\n' +
      '- 키워드 순위\n' +
      '    - 순위는 주간 키워드 순위 정렬 시 책정\n' +
      '    - 표시 형식 - n (m ▲)\n' +
      '    - n : 금주 순위, m : 전주 대비 변동량, 화살표 : 변동 방향▲▼\n' +
      '- 대표 카테고리\n' +
      '    - 키워드로 검색된 영상들의 카테고리 빈도를 통해 결정되어 weekly_views 테이블에 저장됨\n' +
      '- 경쟁강도\n' +
      '    - 콘텐츠의 수요 대비 공급량을 나타내는 지표\n' +
      '    - 조회수 합계에 대한 기준 먼저 적용\n' +
      '        - 조회수 합계 ~ 1,000,000 : 수요 부족\n' +
      '        - 조회수 합계 1,000,000 ~\n' +
      '            - 계산식 : (분석 기간 조회수 합계 / 영상 수) / 사용자 평균조회수\n' +
      '            - 계산 결과\n' +
      '                - 20~ : 블루오션\n' +
      '                - 5~20 :\n' +
      '                    - 영상 수 > 1,000 : 수요 폭발\n' +
      '                    - 영상 수 < 1,000 : 공급 부족\n' +
      '                - 1~5 : 양호\n' +
      '                - 0.1~ 1 : 경쟁 과열\n' +
      '                - ~0.1 : 공급 과잉',
  },
});
