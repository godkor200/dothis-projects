import { findVideoCountByDateServiceInboundPort } from '@Apps/modules/video/domain/ports/find-video-count.inbound.port';
import { FindVideoCountDto } from '@Apps/modules/video/application/dtos/find-video-count.dto';
import { TFindVideoCount } from '@Apps/modules/video/application/queries/v1/find-video-count.query-handler';

import { Inject } from '@nestjs/common';
import { VIDEO_CACHE_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  VideoCacheOutboundPorts,
  VideoCacheRecord,
} from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';
import { GetVideoCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { Err, Ok } from 'oxide.ts';

export class FindVideoCountService
  implements findVideoCountByDateServiceInboundPort
{
  constructor(
    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,
  ) {}

  private countVideosByDate(videoData: VideoCacheRecord) {
    console.time('FindVideoCountService.countVideosByDate');
    let counts = [];

    for (const cluster in videoData) {
      const videos = videoData[cluster];
      videos.forEach((video) => {
        const date = video.publishedDate;
        const formattedDate = `${date.slice(0, 4)}-${date.slice(
          4,
          6,
        )}-${date.slice(6, 8)}`;

        const countItem = counts.find((item) => item.date === formattedDate);

        if (countItem) {
          countItem.number++;
        } else {
          counts.push({ date: formattedDate, number: 1 });
        }
      });
    }
    console.timeEnd('FindVideoCountService.countVideosByDate');
    return counts;
  }

  async execute(dto: FindVideoCountDto): Promise<TFindVideoCount> {
    try {
      const dao = new GetVideoCacheDao(dto);
      const cache = await this.videoCacheService.execute(dao);

      if (cache.isOk()) {
        return Ok(this.countVideosByDate(cache.unwrap()));
      }
    } catch (e) {
      return Err(e);
    }
  }
}
