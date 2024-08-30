import {
  IGetVideoHistoryGetMultipleByIdV2OutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { GetVideoHistoryMultipleByIdV2Dao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';
import { Ok } from 'oxide.ts';

export class MockGetChannelHistoryListAdapter
  implements IGetVideoHistoryGetMultipleByIdV2OutboundPort
{
  async execute(
    dao: GetVideoHistoryMultipleByIdV2Dao,
  ): Promise<TGetVideoHistoryRes> {
    return Ok([
      {
        videoId: 'video_one',
        videoViews: 0,
        videoLikes: 0,
        videoComments: 0,
        videoPerformance: 0,
        videoCluster: 0,
        year: 2024,
        month: 10,
        day: 1,
      },
    ]);
  }
}
