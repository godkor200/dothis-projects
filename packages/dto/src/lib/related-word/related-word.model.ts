import { z } from 'zod';
import { zodDeepPick } from './utils';
import { zSearchKeyword } from '../common.model';
import { zSuccessBase } from '../success.response.zod';
import { zCreateWeeklyKeywordsListSourceSchema } from '../hits';

export const zSearch = zSearchKeyword.pick({ search: true });

export const zRelWords = z.object({
  data: z.object({
    id: z.number(),
    cluster: z.string().describe('[14, 71, 65, 7, 29]'),
    keyword: z.string().describe('애플'),
    relWords: z
      .string()
      .describe(
        '리케,애플행사,xr,애플지분,아이폰업데이트,퀘스트3,앱인벤터,아이지에이웍스,퀄컴,스페이시스,M2칩,맥에어,아이폰13미니,쵸콜릿,에어팟프로2,비전프로,아이폰,mfi,옥시덴탈,애플글라스,애플링,Extra,팥앙금,연육제,삼성갤럭시,칩셋,애플TV,애플MR헤드셋,왓츠앱,개발자회의',
      ),
  }),
});
export const zRanking = z.object({
  expectedViews: z.number().describe('기대조회수'),
  sortFigure: z.number().describe('연관어 정렬 수치'),
  word: z.string().describe('연관어'),
});
export const zRankingArray = z.array(zRanking);

export const zRankingArrayOmitWord = zRanking.omit({ word: true });
export const zRankRel = z.object({
  data: z.object({
    keyword: z.string(),
    ranking: zRankingArray,
  }),
});
export const zRankRes = zRankRel.shape.data;
export const zKeywordsCopy = zRelWords.pick({ data: true }).shape.data.shape
  .keyword;
export const zKeywords = zodDeepPick(zRelWords, 'data.keyword');

export const zResWordsPickData = zRelWords.shape.data;

export const zAutoCompleteWords = z.object({
  data: z.array(z.string()),
});
export const zDeleteRelWords = z.object({
  deleteRelWords: z.array(z.string()).describe('사자'),
});
export const zGetKeywordInformationRes =
  zCreateWeeklyKeywordsListSourceSchema.pick({
    ranking: true,
    keyword: true,
    category: true,
    competitive: true,
    changes: true,
  });
export type zRankingArray = z.TypeOf<typeof zRankingArray>;

export type TRankRes = z.TypeOf<typeof zRankRes>;

export type RelatedWordModel = z.TypeOf<typeof zRelWords>;

export type TKeyword = z.TypeOf<typeof zKeywords>;
export type TRankingArrayOmitWord = z.TypeOf<typeof zRankingArrayOmitWord>;
export type TGetKeywordInformationRes = z.TypeOf<
  typeof zGetKeywordInformationRes
>;
