import { ChannelDataRepositoryPort } from '@Apps/modules/channel/domain/ports/channel-data.repository.port';
import { ChannelEntity } from '@Apps/modules/channel/infrastucture/entities/channel.entity';
import { Paginated, PaginatedQueryParams } from '@Libs/commons';

interface IRes<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export class MockGetChannelDataAdapter implements ChannelDataRepositoryPort {
  // 메서드 시그니처와 반환 타입을 인터페이스 정의와 일치시킵니다.
  private mockDataStore: Map<string, ChannelEntity> = new Map();

  async insert(entity: ChannelEntity): Promise<IRes<void>> {
    // Mock logic for inserting
    this.mockDataStore.set(entity.channelId, entity);
    return {
      success: true,
      message: 'Insert operation successful',
    };
  }

  async updateOne(option: {
    id: string;
    data: Partial<ChannelEntity>;
  }): Promise<IRes<void>> {
    // Mock logic for updating
    return {
      success: true,
      message: 'Update operation successful',
    };
  }

  async findOneById(id: string): Promise<ChannelEntity> {
    // Mock logic for finding one by id
    return new ChannelEntity();
  }

  async findAll(): Promise<ChannelEntity[]> {
    // Mock logic for finding all
    return [new ChannelEntity()];
  }

  async findOneByChannelId(channelId: string): Promise<ChannelEntity> {
    const channelData = new ChannelEntity();
    channelData.channelId = 'ABC123456789012345678901234567890123456789012345';
    channelData.channelIdPart = 'A';
    channelData.channelName = 'Example Channel';
    channelData.channelDescription =
      'This is an example description for the channel';
    channelData.channelTags = 'tag1,tag2,tag3';
    channelData.keyword = 'keyword1,keyword2';
    channelData.tag = 'tag1,tag2';
    channelData.channelCountry = 'US';
    channelData.channelLink = 'http://example.com/channel';
    channelData.channelSince = '2010-01-01';
    channelData.channelCluster = 0;
    channelData.crawledDate = new Date('2023-12-31T12:00:00');
    channelData.userId = 1;
    return channelData;
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
    where: any,
    sort: keyof ChannelEntity,
    order: 'ASC' | 'DESC',
  ): Promise<Paginated<ChannelEntity>> {
    // 모든 데이터 가져오기
    const data = Array.from(this.mockDataStore.values());

    // 타입 단언을 사용하여 `sort` 필드 값 접근하는 유형 안전하게 처리
    const sortedData = data.sort((a, b) => {
      if (order === 'ASC') {
        return a[sort] < b[sort] ? -1 : 1;
      } else {
        return a[sort] > b[sort] ? -1 : 1;
      }
    });

    // ensure page and limit are numeric
    const limit = parseInt(params.limit.toString(), 10);
    const page = parseInt(params.page.toString(), 10);

    const start = (page - 1) * limit;
    const end = start + limit;

    return new Paginated({
      count: sortedData.length,
      limit: limit,
      page: page,
      data: sortedData.slice(start, end),
    });
  }

  async delete(id: string): Promise<boolean> {
    return this.mockDataStore.delete(id);
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T | void> {
    // This mock simply executes the handler
    return handler();
  }
}
