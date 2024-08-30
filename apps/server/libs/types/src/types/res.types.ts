import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zChannelAnalysis,
  zExpectedViewsData,
  zGetAdsRelatedTopHitsRes,
  zGetProbabilityRes,
  zGetVideoAdsInfoRes,
  zKeywords,
  zRanking,
  zResWordsPickData,
  zTokenExpired,
  zVideoCountRes,
  zVideoDetails,
  zVideoModel,
  zKeywordThisWeeklyList,
  zWeeklyKeywordsListSourceSchema,
} from '@dothis/dto';

import { z } from 'zod';

export interface IRes<T = undefined> {
  success: boolean;
  data?: T | any;
}

export interface IResWithItem<T = undefined> {
  success: boolean;
  item?: T | any;
}
export interface getApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export class VideoRes extends createZodDto(extendApi(zVideoModel)) {}
export type VideoCountRes = z.infer<typeof zVideoCountRes.shape.data>;

export class RelWordsEntity extends createZodDto(
  extendApi(zResWordsPickData),
) {}
export class RelWordsRankingRes extends createZodDto(extendApi(zRanking)) {}
export class KeywordRes extends createZodDto(extendApi(zKeywords)) {}
export class TokenExpired extends createZodDto(extendApi(zTokenExpired)) {}

export class ExpectedViewsData extends createZodDto(
  extendApi(zExpectedViewsData),
) {}

export class VideoInfoRes extends createZodDto(
  extendApi(zVideoDetails.shape.data),
) {}

export class ChannelAnalysisRes extends createZodDto(
  extendApi(zChannelAnalysis),
) {}
export class WeeklyKeywordsRes extends createZodDto(
  extendApi(zKeywordThisWeeklyList),
) {}
export class WeeklyKeywordsListSchema extends createZodDto(
  extendApi(zWeeklyKeywordsListSourceSchema),
) {}

export class FindAdsInfoRes extends createZodDto(
  extendApi(zGetVideoAdsInfoRes),
) {}

export class FindAdsRelatedTopHitsRes extends createZodDto(
  extendApi(zGetAdsRelatedTopHitsRes),
) {}
export class GetProbabilityResultType extends createZodDto(
  extendApi(zGetProbabilityRes),
) {}
export class GetWeeklyKeywordsListResType extends createZodDto(
  extendApi(zKeywordThisWeeklyList),
) {}

export interface TTsRestRes<T> {
  status: any;
  body: T;
}
