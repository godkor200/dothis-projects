import {
  IGetVideoAdsTopHitsAdapterOutboundPort,
  TFindAdsTopHitsRepoRes,
} from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoAdsTopHitsDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons';

export class MockGetTopHitsVideoAdapter
  implements IGetVideoAdsTopHitsAdapterOutboundPort
{
  async execute(dao: GetVideoAdsTopHitsDao): Promise<TFindAdsTopHitsRepoRes> {
    try {
      return Ok([
        {
          videoPublished: '2232323', // 비디오가 게시되었음을 나타냅니다.
          videoTitle: 'Sample Video Title', // 비디오의 제목
          videoViews: 12345, // 비디오 조회 수
        },
      ]);
    } catch (err) {
      return Err(new TableNotFoundException(err.message));
    }
  }
}
