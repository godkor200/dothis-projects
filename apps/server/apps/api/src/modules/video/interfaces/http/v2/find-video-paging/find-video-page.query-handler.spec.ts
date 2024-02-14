import { mock } from 'jest-mock-extended';
import { VideoQueryHandlerOutboundPort } from '@Apps/modules/video/domain/ports/video.query-handler.outbound.port';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';
import { FindVideoPageQueryHandler } from '@Apps/modules/video/application/queries/v1/find-video-page.query-handler';

const mockVideoServicePort = mock<VideoQueryHandlerOutboundPort>();
const mockChannelQueryHandlerPort = mock<ChannelQueryHandlerPort>();
let handler: FindVideoPageQueryHandler;

beforeEach(async () => {
  handler = new FindVideoPageQueryHandler(
    mockVideoServicePort,
    mockChannelQueryHandlerPort,
  );
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});

describe('예외 처리', () => {
  it('해당 키워드에 비디오가 없을 경우 Not Found를 띄웁니다.', async () => {
    // const arg: FindVideoPageQuery = {
    //   clusterNumber: 6,
    //   limit: 5,
    //   search: '고기',
    //   related: '영화평론',
    // };
    // mockVideoServicePort.findVideoPaging.mockReturnValue(
    //   Promise.resolve({
    //     total: {
    //       value: 0,
    //       relation: 'eq',
    //     },
    //     data: [],
    //   } as IPagingRes),
    // );
    // const res = await handler.execute(arg);
    // expect(res.isErr()).toBe(true);
    // expect(res.expectErr('The video could not be found.').message).toBe(
    //   'The video could not be found.',
    // );
  });
});
