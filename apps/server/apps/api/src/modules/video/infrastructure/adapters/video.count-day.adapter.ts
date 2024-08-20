import {
  IGetRelatedVideosCountByDayOutBoundPort,
  TRelatedVideosCountByDay,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons';
import { Injectable } from '@nestjs/common';

/**
 * 비디오 총갯수를 받아오는 어뎁터
 * 조건:
 *  - video_published 3개월내 이상
 */
@Injectable()
export class VideoCountDayAdapter
  implements IGetRelatedVideosCountByDayOutBoundPort
{
  async execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideosCountByDay> {
    const { search, related, from, to, relatedCluster } = dao;

    try {
      return Ok([]);
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
