import { AnalysisHitsV2Service } from '@Apps/modules/hits/application/services/analysis-hits.v2.service';
import { VideoCacheOutboundPorts } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { mock } from 'jest-mock-extended';
import { VideoHistoryGetMultipleByIdV2Adapter } from '@Apps/modules/video-history/infrastructure/adapters/new/video-hitstory.get-multiple-by-id.adapter';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ConfigService } from '@nestjs/config';
import { ChannelHistoryByChannelIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import {
  GetAnalysisHitsQuery,
  GetAnalysisHitsV2Dto,
} from '@Apps/modules/hits/application/dtos/get-analysis-hits.dto';
import { videoInfoDummyData } from '@Apps/modules/hits/application/services/__dummy__/video.cache.dummy';
let handler: AnalysisHitsV2Service;

const configService = new ConfigService();
const igniteService = new IgniteService(configService);
const videoCacheMock = mock<VideoCacheOutboundPorts>();
const videoHistoryGetMultipleByIdV2Adapter =
  new VideoHistoryGetMultipleByIdV2Adapter(igniteService);

const getChannelHistoryByChannelId = new ChannelHistoryByChannelIdAdapter(
  igniteService,
);
beforeEach(() => {
  handler = new AnalysisHitsV2Service(
    videoCacheMock,
    videoHistoryGetMultipleByIdV2Adapter,
    getChannelHistoryByChannelId,
  );
});
describe('채널 id 들어가기 이전에 ', () => {
  it('should ', async () => {
    const arg: GetAnalysisHitsQuery = {
      search: '서울',
      related: '대구',
      from: '2024-05-01',
      to: '2024-05-07',
    };
    const dto = new GetAnalysisHitsV2Dto(arg);
    const dao = new GetVideoCacheDao(arg);
    videoCacheMock.execute.mockResolvedValue(videoInfoDummyData);
    const res = await handler.execute(dto);
    console.log(res);
  });
});
