import { UserChannelDataRepositoryPort } from '@Apps/modules/user-channel-data/v1/db/user-channel-data.repository.port';
import { Paginated, PaginatedQueryParams } from '@Libs/commons/src';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { ChannelDataRepositoryPort } from '@Apps/modules/channel/db/channel-data.repository.port';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';
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

export class ChannelDataMock implements ChannelDataRepositoryPort {
  private readonly result: ChannelEntity;
  constructor(result: ChannelEntity) {
    this.result = result;
  }
  delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<ChannelEntity[]> {
    return Promise.resolve([]);
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<ChannelEntity>> {
    return Promise.resolve(undefined);
  }

  findOneByChannelId(channelId: string): Promise<ChannelEntity> {
    return Promise.resolve(this.result);
  }

  findOneById(id: string): Promise<ChannelEntity> {
    return Promise.resolve(undefined);
  }

  insert(entity: ChannelEntity): Promise<IResDto> {
    return Promise.resolve({ success: true });
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }
}
