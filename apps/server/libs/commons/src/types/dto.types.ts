import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  zUserModel,
  zVideoHistory,
  zVideoModel,
  zTokenExpired,
  zKeywords,
  zResWordsPickData,
  zRankRes,
  zVideoDetails,
  zChannelAnalysis,
} from '@dothis/dto';
import { zExpectedData, zIncreaseData } from '@Libs/commons/src/types/res.zod';

export class UserDto extends createZodDto(extendApi(zUserModel)) {}
export class UserRes extends UserDto {}
export class VideoHistoryRes extends createZodDto(extendApi(zVideoHistory)) {}

export class VideoRes extends createZodDto(extendApi(zVideoModel)) {}

export class RelWordsEntity extends createZodDto(
  extendApi(zResWordsPickData),
) {}
export class RelWordsRankingRes extends createZodDto(extendApi(zRankRes)) {}
export class KeywordRes extends createZodDto(extendApi(zKeywords)) {}
export class TokenExpired extends createZodDto(extendApi(zTokenExpired)) {}

export class ExpectedViewsData extends createZodDto(extendApi(zExpectedData)) {}

export class IncreaseData extends createZodDto(extendApi(zIncreaseData)) {}

export class VideoInfoRes extends createZodDto(extendApi(zVideoDetails)) {}

export class ChannelAnalysisRes extends createZodDto(
  extendApi(zChannelAnalysis),
) {}
