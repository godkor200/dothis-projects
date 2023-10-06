import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { mock } from 'jest-mock-extended';
import {
  GoogleLoginRedirectCommandHandler,
  UserInfoCommandDto,
} from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { JwtService } from '@nestjs/jwt';
import { RequestContextService } from '@Libs/commons/src/application/context/AppRequestContext';
import { nanoid } from 'nanoid';

const mockUserRepositoryPort = mock<UserRepositoryPort>();
const mockJwtService = mock<JwtService>();
let service: GoogleLoginRedirectCommandHandler;

beforeEach(async () => {
  service = new GoogleLoginRedirectCommandHandler(
    mockUserRepositoryPort,
    mockJwtService,
  );
  jest.spyOn(RequestContextService, 'getContext').mockReturnValue({
    requestId: nanoid(6),
    req: undefined,
    res: undefined,
  });
});

describe('GoogleLoginRedirectCommandHandler 예외 처리', () => {
  /**
   * 예외 상황
   * checkUser 가 null이나 다를 경우 server err
   *
   */
  it('checkUser가 없을 경우 server err를 띄웁니다.', async () => {
    const arg: UserInfoCommandDto = {
      id: BigInt(1234567890),
      userEmail: 'godkor200@gmail.com',
      tokenRefresh: 'aaaaa',
      googleAccessToken: 'googleAccessToken',
      googleRefreshToken: 'googleRefreshToken',
    };

    mockUserRepositoryPort.findOneByEmail.mockReturnValue(null);

    const res = await service.execute(arg);

    expect(res.isErr()).toBe(true);
    expect(res.expectErr('Internal server error').message).toBe(
      'Internal server error',
    );
  });
});
