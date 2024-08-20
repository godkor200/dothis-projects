import {
  IGetRelatedVideoAndVideoHistoryOutBoundPort,
  TRelatedVideoAndHistoryRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { SearchRelationVideoAndHistoryDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons';
import { Injectable } from '@nestjs/common';

/**
 * 해당하는 비디오의 히스토리를 list up 해서 불러옵니다.
 * 이 메소드는 특정 비디오 아이디를 기반으로 정보를 검색합니다.
 * 날짜 범위가 같은 달 내에 있을 때와 다른 달에 걸쳐 있을 때의 로직을 다르게 처리합니다.
 */
@Injectable()
export class VideoHistoryGetListByIdsAdapter
  implements IGetRelatedVideoAndVideoHistoryOutBoundPort
{
  async execute(
    dao: SearchRelationVideoAndHistoryDao,
  ): Promise<TRelatedVideoAndHistoryRes> {
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
