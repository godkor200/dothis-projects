import { FetchReqVideoDto } from '@ExternalApps/feature/crawl-queue/video/application/dto/fetch-req-video.dto';
import { Result } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { zGetReqVideoList, zReqVideoList } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
export class TotalFetchReqVideoRes extends createZodDto(
  extendApi(zGetReqVideoList),
) {}

export class FetchReqVideoRes extends createZodDto(extendApi(zReqVideoList)) {}

export type TFetchRequestVideoRes = Result<
  FetchReqVideoRes,
  VideoNotFoundException
>;

export interface FetchReqVideoInbound {
  execute(dto: FetchReqVideoDto): Promise<TFetchRequestVideoRes>;
}
