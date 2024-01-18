import { GetUserCommandHandler } from './get-user.service';
import { User } from '@Apps/modules/user/domain/user.entity';
import { MockGetUser } from '@Apps/modules/user/__mock__/getUser.mock';
import { Ok } from 'oxide.ts';
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
      Membership: null,
      channel: null,
      personalizationTag: 's',
      isEnvLocal: false,
      searchWord: "['1111']",
      recentStoryboards: [],
    };
    const getOneUserService = new GetUserCommandHandler(new MockGetUser(user));

    const res = await getOneUserService.execute({ userId: '5' });
    expect(res.isOk()).toStrictEqual(true);
    expect(res.unwrap()).toStrictEqual(user);
  });
});
