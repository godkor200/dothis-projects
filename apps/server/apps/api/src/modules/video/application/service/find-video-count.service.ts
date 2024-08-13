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
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { RedisResultMapper } from '@Apps/common/redis/mapper/to-object.mapper';
import { KeywordServiceHelper } from '@Apps/common/helpers/get-video-data.helper';

export class FindVideoCountService
  implements findVideoCountByDateServiceInboundPort
{
  private readonly dataHelper: KeywordServiceHelper;

  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(VIDEO_CACHE_ADAPTER_DI_TOKEN)
    private readonly videoCacheService: VideoCacheOutboundPorts,
  ) {
    this.dataHelper = new KeywordServiceHelper(relWordsRepository);
  }

  private countVideosByDate(
    videoData: VideoCacheRecord,
    from: string,
    to: string,
  ) {
    let counts = [];

    const fromDate = new Date(from);
    const toDate = new Date(to);
    for (const cluster in videoData) {
      const videos = videoData[cluster];
      videos.forEach((video) => {
        const date = video.publishedDate;
        const formattedDate = `${date.slice(0, 4)}-${date.slice(
          4,
          6,
        )}-${date.slice(6, 8)}`;
        const videoDate = new Date(formattedDate);

        if (videoDate >= fromDate && videoDate <= toDate) {
          const countItem = counts.find((item) => item.date === formattedDate);

          if (countItem) {
            countItem.number++;
          } else {
            counts.push({ date: formattedDate, number: 1 });
          }
        }
      });
    }
    console.timeEnd('FindVideoCountService.countVideosByDate');
    return counts;
  }

  async execute(dto: FindVideoCountDto): Promise<TFindVideoCount> {
    try {
      const relatedCluster = await this.dataHelper.getClusters(dto.search);
      const relatedClusterUnwrap = relatedCluster.unwrap();
      const dao = new GetVideoCacheDao({
        ...dto,
        relatedCluster: relatedClusterUnwrap,
      });
      const cache = await this.videoCacheService.execute(dao);

      if (cache.isOk()) {
        const cacheUnwrap = cache.unwrap();
        const grouped = RedisResultMapper.groupByCluster(
          RedisResultMapper.toObjects(cacheUnwrap),
        );

        const result = this.countVideosByDate(grouped, dto.from, dto.to);

        if (!result.length) {
          return Ok(null);
        }
        return Ok(this.countVideosByDate(grouped, dto.from, dto.to));
      }
    } catch (e) {
      return Err(e);
    }
  }
}
