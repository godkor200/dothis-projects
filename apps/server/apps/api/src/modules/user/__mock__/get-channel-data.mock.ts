import {
  Paginated,
  PaginatedQueryParams,
  updateObject,
} from '@Libs/commons/src';
import { ChannelDataRepositoryPort } from 'apps/api/src/modules/channel/repository/db/channel-data.repository.port';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { ChannelEntity } from 'apps/api/src/modules/channel/repository/entity/channel.entity';

export class ChannelDataMock implements ChannelDataRepositoryPort {
  private readonly result: ChannelEntity;
  constructor(result: ChannelEntity) {
    this.result = result;
  }
  updateOne(option: updateObject): Promise<IRes<void>> {
    throw new Error('Method not implemented.');
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

  insert(entity: ChannelEntity): Promise<IRes<void>> {
    return Promise.resolve({ success: true });
  }

  transaction<T>(handler: () => Promise<T>): Promise<void | T> {
    return Promise.resolve(undefined);
  }
}
