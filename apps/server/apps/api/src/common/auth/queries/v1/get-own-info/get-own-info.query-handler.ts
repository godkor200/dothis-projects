import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interfaces/get-own-info.interface';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { TOwnInfoRes as TOwnInfo } from '@dothis/dto';
import { CHANNEL_DATA_DI_TOKEN } from '@Apps/modules/channel/channel.di-token';
import { ChannelAdapterOutboundPort } from '@Apps/modules/channel/domain/ports/channel.adapter.port';
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

    @Inject(CHANNEL_DATA_DI_TOKEN)
    private readonly channelDataInfoAdapter: ChannelAdapterOutboundPort,
  ) {}
  async execute(query: GetOwnInfoQuery): Promise<TOwnInfoRes> {
    try {
      const user = await this.userRepository.findOneWithRelations(query.index);
      if (!user) return Err(new UserNotFoundError());

      const channelInfo = await this.channelDataInfoAdapter.execute([
        user.channelId,
      ]);

      if (channelInfo.isOk()) {
        const channelInfoUnwrap = channelInfo.unwrap();
        if (channelInfoUnwrap.length)
          return Ok({
            ...user,
            dateSignIn: user.dateSignIn,
            channel: {
              ...channelInfoUnwrap[0],
              channelTags:
                channelInfo
                  .unwrap()[0]
                  .channelTags.split(',')
                  .map((e) => e.trim()) || null,
              channelIdPart: channelInfoUnwrap[0].channelIdPart || '',
              channelCountry: channelInfoUnwrap[0].channelCountry || '',
              channelLink: channelInfoUnwrap[0].channelLink || '',
              channelSince: channelInfoUnwrap[0].channelSince || '',
              channelCluster: channelInfoUnwrap[0].channelCluster || 0,
              crawledDate: channelInfoUnwrap[0].crawledDate || new Date(),
              channelThumbnail: channelInfoUnwrap[0].channelThumbnail || 0,
            },
          });
        return Ok({
          ...user,
          dateSignIn: user.dateSignIn,
          channel: null,
        });
      }
    } catch (e) {
      return Err(e);
    }
  }
}
