import { zDeleteVideoParam, zPostStoryBoardQuery } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class DelReqVideoParam extends createZodDto(
  extendApi(zDeleteVideoParam),
) {}

export class PostStoryBoardQuery extends createZodDto(
  extendApi(zPostStoryBoardQuery),
) {}

export class DelReqVideoDto {
  videoId: string;
  clientId: string;
  vodId: string;
  constructor(props: { videoId: string; clientId: string; vodId: string }) {
    this.videoId = props.videoId;
    this.clientId = props.clientId;
    this.vodId = props.vodId;
  }
}
