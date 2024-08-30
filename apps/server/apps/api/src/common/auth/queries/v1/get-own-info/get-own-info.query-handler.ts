import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interfaces/get-own-info.interface';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { TOwnInfoRes as TOwnInfo } from '@dothis/dto';
export type TOwnInfoRes = Result<
  TOwnInfo,
  ChannelNotFoundError | UserNotFoundError
>;
@QueryHandler(GetOwnInfoQuery)
export class GetOwnInfoQueryHandler
  implements IQueryHandler<GetOwnInfoQuery, TOwnInfoRes>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(query: GetOwnInfoQuery): Promise<TOwnInfoRes> {
    const user = await this.userRepository.findOneWithRelations(query.index);
    if (!user) return Err(new UserNotFoundError());
    /**
     * FIXME: os 채널 데이터에서 가져오기
     */
    // const channelInfo = await this.channelRepository.findOneByChannelId(
    //   user.channelId,
    // );

    return Ok({ ...user, dateSignIn: user.dateSignIn, channel: null });
    // return Ok({
    //   ...user,
    //   dateSignIn: user.dateSignIn,
    //   channel: {
    //     ...channelInfo,
    //     keyword: channelInfo.keyword.split(',').map((e) => e.trim()),
    //     channelTags: channelInfo.channelTags.split(',').map((e) => e.trim()),
    //   },
    // });
  }
}
