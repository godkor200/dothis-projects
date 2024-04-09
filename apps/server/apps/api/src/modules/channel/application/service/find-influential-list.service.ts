import { FindInfluentialListInboundPort } from '@Apps/modules/channel/domain/ports/find-influential-list.inbound.port';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import { TFindInfluentialListRes } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
import { FIND_CHANNEL_PROFILE_IGNITE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { ChannelProfileOutboundPort } from '@Apps/modules/channel/domain/ports/channel-profile.outbound.port';
import { ChannelProfileDao } from '@Apps/modules/channel/infrastucture/daos/channel.dao';
import { Inject } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';

export class FindInfluentialListService
  implements FindInfluentialListInboundPort
{
  /**
   * channel_name, channel_cluster, main_used_keyword, channel_subscribers, channel_average_views
   * - channel_data
   *     - 채널명, 채널 카테고리, 핵심 키워드
   * - channel_history
   *     - 구독자, 평균조회수
   * 추후 데이터 해야 될것들
   * - 프사(채널 썸네일)
   *     - 이전까지 썸네일은 주소 체계를 이용해 video_id만 가지고 접속했기 때문에 따로 수집 안함
   *     - 프로필도 마찬가지일 것으로 예상했으나 channel_id 응용 주소 체계를 가지지 않음
   *     - 따라서, channel_data에 컬럼을 추가하고 크롤링 목록에 추가 및 전체 업데이트를 시행할 예정
   * 정보 호출 방법
   * - 키워드 & 연관어 로 검색된 video의 channel_id를 이용해 채널 목록 호출
   * - 채널 목록 기본 제공 형태는 **구독자순 정렬**이며, 평균조회수순 정렬로 변경할 수 있게 요청
   * @param dao
   */
  constructor(
    @Inject(FIND_CHANNEL_PROFILE_IGNITE_DI_TOKEN)
    private readonly channelProfileAdapter: ChannelProfileOutboundPort,
  ) {}
  async execute(dto: FindInfluentialListDto): Promise<TFindInfluentialListRes> {
    const dao = new ChannelProfileDao(dto);
    try {
      const res = await this.channelProfileAdapter.execute(dao);
      if (res.isOk()) {
        return Ok({ success: true, data: res.unwrap() });
      }
      return Err(res.unwrapErr());
    } catch (e) {
      return Err(e);
    }
  }
}
