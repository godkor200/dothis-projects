import { GetChannelListQuery } from '@Apps/modules/channel/application/dtos/get-channel-list.dto';
import { ChannelSubscriberRangeType } from '@dothis/dto';

export class ChannelListDao {
  public channelCluster: number | null;
  public channelSubscriber: ChannelSubscriberRangeType | null;
  public limit: number | string;
  public sort: string;

  constructor(
    channelCluster: number | null = null,
    channelSubscriber: ChannelSubscriberRangeType | null = null,
    limit: number | string = 100,
    sort: string = 'channel_id',
  ) {
    this.channelCluster = channelCluster;
    this.channelSubscriber = channelSubscriber;
    this.limit = Math.min(Number(limit), 100); // 최대 50개 제한
    this.sort = sort;
  }

  /**
   * 주어진 객체로부터 `ChannelListDao` 인스턴스를 생성합니다.
   * @param queryData - 채널 검색에 필요한 쿼리 데이터를 포함한 객체
   * @returns 새로운 `ChannelListDao` 인스턴스
   */
  static fromQuery(queryData: GetChannelListQuery): ChannelListDao {
    return new ChannelListDao(
      queryData.channelCluster ?? null,
      queryData.channelSubscriber ?? null,
      queryData.limit ?? 50,
      queryData.sort ?? 'channel_id',
    );
  }
}
