import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zChannelTagsKeywordsData } from '@dothis/dto/dist';

export class ChannelKeywordOrtagDtos extends createZodDto(
  extendApi(zChannelTagsKeywordsData),
) {}
