import { IVideoHistoryGetTopViewsByIdsOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideoHistoryGetTopViewsByIdsDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Injectable } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';

@Injectable()
export class VideoHistoryGetTopViewsByIdsAdapter
  implements IVideoHistoryGetTopViewsByIdsOutboundPort
{
  async execute(dao: VideoHistoryGetTopViewsByIdsDao): Promise<TIssueTodayRes> {
    try {
      return Ok([]);
    } catch (error) {
      return Err(error);
    }
  }
}
