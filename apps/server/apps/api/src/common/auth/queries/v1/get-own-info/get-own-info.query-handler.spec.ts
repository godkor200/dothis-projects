import { mock } from 'jest-mock-extended';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { GetOwnInfoQueryHandler } from '@Apps/common/auth/queries/v1/get-own-info/get-own-info.query-handler';
import { GetOwnInfoQuery } from '@Apps/common/auth/interface/get-own-info.interface';

const mockUserRepository = mock<UserRepositoryPort>();

let handler: GetOwnInfoQueryHandler;

beforeEach(() => {
  handler = new GetOwnInfoQueryHandler(mockUserRepository);
});

describe('GetOwnInfoQueryHandler 예외 처리', () => {
  it('유저가 없으면 user not found를 띄웁니다.', async () => {
    mockUserRepository.findOneWithRelations.mockReturnValue(null);
    const arg: GetOwnInfoQuery = {
      index: '1',
    };
    const res = await handler.execute(arg);
    expect(res.isErr()).toBe(true);
    expect(res.expectErr('Not Found').message).toBe('Not Found');
  });
});
