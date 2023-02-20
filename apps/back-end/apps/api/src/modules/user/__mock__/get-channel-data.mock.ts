import { UserChannelDataRepositoryPort } from '@Apps/api/src/modules/user-channel-data/v1/db/user-channel-data.repository.port';
import { Paginated, PaginatedQueryParams } from '@Libs/commons/src';
import { UserChannelData } from '@Apps/api/src/config/database/domain/userChannelData/UserChannelData.entity';
import { ChannelDataRepositoryPost } from '@Apps/api/src/modules/channel/v1/db/channel-data.repository.post';
import { Channel } from '@Apps/api/src/config/database/domain/channel/Channel.entity';
import { IResDto } from '@Libs/commons/src/types/res.types';

export class UserChannelDataMock implements UserChannelDataRepositoryPort {
  private readonly result: UserChannelData;
  constructor(result: UserChannelData) {
    this.result = result;
  }
  findOneByUserId(userId: string): Promise<UserChannelData> {
    return Promise.resolve(this.result);
  }
  delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<UserChannelData[]> {
    return Promise.resolve([this.result]);
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<UserChannelData>> {
    return Promise.resolve(undefined);
  }

  findOneById(id: string): Promise<UserChannelData> {
    return Promise.resolve(this.result);
  }

  insert(entity: UserChannelData): Promise<IResDto> {
    Promise.resolve(this.result);
    return Promise.resolve({ success: true });
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }
}

export class ChannelDataMock implements ChannelDataRepositoryPost {
  private readonly result: Channel;
  constructor(result: Channel) {
    this.result = result;
  }
  delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<Channel[]> {
    return Promise.resolve([]);
  }

  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Channel>> {
    return Promise.resolve(undefined);
  }

  findOneByChannelId(channelId: string): Promise<Channel> {
    return Promise.resolve(this.result);
  }

  findOneById(id: string): Promise<Channel> {
    return Promise.resolve(undefined);
  }

  insert(entity: Channel): Promise<IResDto> {
    return Promise.resolve({ success: true });
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }
}
