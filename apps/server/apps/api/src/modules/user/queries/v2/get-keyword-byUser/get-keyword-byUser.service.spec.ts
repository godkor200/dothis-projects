import { mock } from 'jest-mock-extended';
import {
  FindKeywordTagByUserCommand,
  GetUserV2CommandHandler,
} from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/domain/ports/channel-data.repository.port';
import { RequestContextService } from '@Libs/commons/application/context/AppRequestContext';
import { nanoid } from 'nanoid';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';

const mockChannelDataRepo = mock<ChannelDataRepositoryPort>();
let handler: GetUserV2CommandHandler;

beforeEach(() => {
  handler = new GetUserV2CommandHandler(mockChannelDataRepo);
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});

describe('예외 처리', () => {
  it('채널을 찾을수 없으면 Channel not found 띄웁니다.', async () => {
    mockChannelDataRepo.findOneByChannelId.mockReturnValue(null);
    const arg: FindKeywordTagByUserCommand = {
      userId: '1',
      channelId: '1',
    };
    const res = await handler.execute(arg);
    expect(res.isErr()).toBe(true);
    expect(res.expectErr(ChannelNotFoundError.message).message).toBe(
      ChannelNotFoundError.message,
    );
  });
});
