import { GetUserCommandHandler } from './get-user.service';
import { UserRepositoryPort } from '@Apps/api/src/user/v1/db/user.repository.port';
import { User } from '@Libs/entity/src/domain/user/User.entity';

class MockGetUser implements UserRepositoryPort {
  private readonly result: User;

  constructor(result: User) {
    this.result = result;
  }

  findOneById(id: string): Promise<User> {
    return Promise.resolve(this.result);
  }

  delete(id: string): boolean {
    return !!this.result;
  }

  findAll(): Promise<User>[] {
    return [Promise.resolve(this.result)];
  }

  findAllPaginated(params: any): any {
    return Promise.resolve(undefined);
  }

  findOneByEmail(userEmail: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  insert(entity: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }

  updateRefreshToken(id: number, token: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

describe('get-user spec', () => {
  test('유저 하나를 리턴한다.', async () => {
    const user: User = {
      id: 5,
      userEmail: 'godkor200@gmail.com',
      channelId: null,
      tokenRefresh:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjc1MzI1MDA0LCJleHAiOjE2NzU0MTE0MDR9.gYWPLJRT55JcO7JePUOxh_9dYvR7iCxvkoRL0UZOayI',
      agreePromotion: null,
      plan: null,
      isAdmin: null,
      status: null,
      dateSignIn: new Date('2023-01-25 16:22:23'),
      UserChannelData: null,
      Subscribe: null,
      Channel: null,
    };
    const getOneUserService = new GetUserCommandHandler(new MockGetUser(user));

    const res = await getOneUserService.execute({ userId: '5' });
    expect(res).toStrictEqual(user);
  });
});
