import {
  IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort,
  TGetVideoViewsMatchingSearchOnSpecificDateRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoViewsMatchingSearchOnSpecificDateDao } from '@Apps/modules/hits/infrastructure/daos/hits.dao';
import { Ok } from 'oxide.ts';

export class MockGetUnknownAdapter
  implements IGetVideoViewsMatchingSearchOnSpecificDateOutboundPort
{
  async execute<T extends unknown[]>(
    dao: GetVideoViewsMatchingSearchOnSpecificDateDao,
  ): Promise<TGetVideoViewsMatchingSearchOnSpecificDateRes<T>> {
    try {
      return Ok([{}] as T[]);
    } catch (err) {
      // 에러 처리 로직 추가할 수 있음
      throw err; // 에러 재발생시키기
    }
  }
}
