import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zChannelTagsKeywordsData } from '@dothis/dto';

export class ChannelKeywordOrtagDtos extends createZodDto(
  extendApi(zChannelTagsKeywordsData),
) {}

export class ResultChannelKeywordTag extends ChannelKeywordOrtagDtos {}
