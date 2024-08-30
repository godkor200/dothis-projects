import {
  IGetOneVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Err, Ok } from 'oxide.ts';

export class MockVideoHistory implements IGetOneVideoHistoryOutboundPort {
  async execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes> {
    try {
      return Ok([
        {
          videoId: 'VID1234567890',
          videoViews: 12345,
          videoLikes: 678,
          videoComments: 45,
          videoPerformance: 1.5,
          videoCluster: 2,
          year: 2024,
          month: 8,
          day: 22,
        },
      ]);
    } catch (error) {
      return Err(error);
    }
  }
}
