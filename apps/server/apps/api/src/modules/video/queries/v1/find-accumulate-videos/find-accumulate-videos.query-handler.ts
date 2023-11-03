import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAccumulateVideosDtos } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { Inject } from '@nestjs/common';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import {
  IFindAccumulateVideoRes,
  ISection,
  SECTION_NUMBER,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { IFindVideoIDAndChannelIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { Ok, Result } from 'oxide.ts';

@QueryHandler(FindAccumulateVideosDtos)
export class FindAccumulateVideosQueryHandler
  implements
    IQueryHandler<
      FindAccumulateVideosDtos,
      Result<IFindAccumulateVideoRes<ISection[]>, any>
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,
  ) {}

  /**
   * 1.
   * @param arg
   */
  async execute(
    arg: FindAccumulateVideosDtos,
  ): Promise<Result<IFindAccumulateVideoRes<ISection[]>, any>> {
    const userInfo = arg.user;
    const userChannelId = userInfo.channelId;
    const channel = await this.channelHistory.findChannelHistoryByLimit(
      [userChannelId],
      1,
      'desc',
    );

    const subscribers = channel[0].channel_subscribers;
    const section = this.getRangeValues(subscribers);
    const searchRelatedVideo =
      await this.video.findvideoIdfullScanAndVideos<IFindVideoIDAndChannelIdRes>(
        arg,
      );

    const {
      channelIds,
      videoIds,
    }: { channelIds: string[]; videoIds: string[] } = searchRelatedVideo.reduce(
      (acc, e) => {
        acc.channelIds.push(e.channel_id);
        acc.videoIds.push(e.video_id);
        return acc;
      },
      { channelIds: [], videoIds: [] },
    );

    const channelHistoryRes =
      await this.channelHistory.findChannelHistoryFullscan(channelIds);

    return Ok({
      videoTotal: videoIds.length,
      section: this.countSubscribersByRange(channelHistoryRes),
    });
  }

  private readonly ranges = [
    { gte: 100, lte: 1000, max: 1000, section: SECTION_NUMBER.RANGE_100_1000 },
    {
      gte: 1000,
      lte: 10000,
      max: 10000,
      section: SECTION_NUMBER.RANGE_1000_10000,
    },
    {
      gte: 10000,
      lte: 50000,
      max: 50000,
      section: SECTION_NUMBER.RANGE_10000_50000,
    },
    {
      gte: 50000,
      lte: 100000,
      max: 100000,
      section: SECTION_NUMBER.RANGE_50000_100000,
    },
    {
      gte: 100000,
      lte: 500000,
      max: 500000,
      section: SECTION_NUMBER.RANGE_100000_500000,
    },
    {
      gte: 500000,
      max: Infinity,
      section: SECTION_NUMBER.RANGE_500000_AND_ABOVE,
    },
  ];

  private getRangeValues(num: number) {
    for (let range of this.ranges) {
      if (num < range.max) {
        return { gte: range.gte, lte: range.lte, sec: range.section };
      }
    }
    throw new Error('Invalid number');
  }

  private countSubscribersByRange(data): ISection[] {
    const rangesWithCount = this.ranges.map((range) => ({
      ...range,
      number: 0,
    }));

    for (let item of data) {
      const subscribers = item.channel_subscribers;

      for (let range of rangesWithCount) {
        if (subscribers < range.max) {
          range.number++;
          break;
        }
      }
    }

    return rangesWithCount;
  }
}
