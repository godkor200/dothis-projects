import { zStoryBoardCreateRes } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class StoryBoardCreateRes extends createZodDto(
  extendApi(zStoryBoardCreateRes),
) {}