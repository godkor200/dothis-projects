import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zChannelAnalysis,
  zDailyViewData,
  zExpectedViewsData,
  zGetAdsRelatedTopHitsRes,
  zGetProbabilityRes,
  zGetVideoAdsInfoRes,
  zKeywords,
  zRanking,
  zResWordsPickData,
  zTokenExpired,
  zVideoDetails,
  zVideoModel,
  zWeeklyKeywordsList,
  zWeeklyKeywordsListSourceSchema,
} from '@dothis/dto';
import { UserDto } from '@Libs/commons/src/interfaces/types/dto.types';

export interface IRes<T = undefined> {
  success: boolean;
  data?: T | any;
}

export class UserRes extends UserDto {}

export class VideoRes extends createZodDto(extendApi(zVideoModel)) {}

export class RelWordsEntity extends createZodDto(
  extendApi(zResWordsPickData),
) {}
export class RelWordsRankingRes extends createZodDto(extendApi(zRanking)) {}
export class KeywordRes extends createZodDto(extendApi(zKeywords)) {}
export class TokenExpired extends createZodDto(extendApi(zTokenExpired)) {}

export class ExpectedViewsData extends createZodDto(
  extendApi(zExpectedViewsData),
) {}

export class IncreaseData extends createZodDto(extendApi(zDailyViewData)) {}
export class WeeklyData extends createZodDto(
  extendApi(zWeeklyKeywordsListSourceSchema),
) {}
export class VideoInfoRes extends createZodDto(
  extendApi(zVideoDetails.shape.data),
) {}

export class ChannelAnalysisRes extends createZodDto(
  extendApi(zChannelAnalysis),
) {}
export class WeeklyKeywordsRes extends createZodDto(
  extendApi(zWeeklyKeywordsList),
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
  extendApi(zWeeklyKeywordsList),
) {}

export interface TTsRestRes<T> {
  status: any;
  body: T;
}
