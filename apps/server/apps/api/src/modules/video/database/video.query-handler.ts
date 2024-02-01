import { from, lastValueFrom, map } from 'rxjs';
import {
  IFindVideoPageDao,
  VideoQueryHandlerOutboundPort,
} from './video.query-handler.outbound.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
  IVideo,
} from '@Apps/modules/video/interfaces/find-many-video.interface';
import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { Err } from 'oxide.ts';
import { FindVideoPageV2Dto } from '@Apps/modules/video/queries/v2/find-video-paging/find-video-paging.req.dto';
import { FindDailyViewsV3Dto } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';
import { SearchQueryBuilder } from '@Apps/modules/video/utils/search-query.builder';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { FindDailyViewsV3Dao, FindVideosDao } from './video.dao';

export class VideoQueryHandler
  extends AwsOpenSearchConnectionService
  implements VideoQueryHandlerOutboundPort
{
  async findRelatedVideoIdAndChannelIdFullScan(
    arg: FindVideosDao,
  ): Promise<any> {
    /**
     * FIXME: any 고치기
     */
    const { cluster, search, related, from, to } = arg;
    const searchQuery = SearchQueryBuilder.videoSearchAfter(
      'video-' + cluster,
      '10000',
      search,
      related,
      undefined,
      [VIDEO_DATA_KEY.CHANNEL_ID, VIDEO_DATA_KEY.CHANNEL_ID],
    );
    return await this.fullScanBySearchAfter(searchQuery, (doc) => doc);
  }
  async findManyVideo(tag: string): Promise<string[]> {
    const searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${tag}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${tag}*`,
                },
              },
            ],
          },
        },
        _source: 'video_id',
      },
    };
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    ).pipe(map((hits) => hits.map((hit) => hit._source.video_id)));

    return await lastValueFrom(observable$);
  }
  async findVideoByWords(
    words: FindVideoQuery,
  ): Promise<IFindManyVideoResult[]> {
    let searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${words.search}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${words.search}*`,
                },
              },
            ],
          },
        },
      },
    };
    if (words.related)
      searchQuery.body.query.bool.should.push(
        {
          wildcard: {
            video_tag: `*${words.related}*`,
          },
        },
        {
          wildcard: {
            video_title: `*${words.related}*`,
          },
        },
      );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    );

    return await lastValueFrom(observable$);
  }

  async findVideoIdFullScanAndVideos<T>(
    query: FindDailyViewsV3Dao,
  ): Promise<T[] | ScrollApiError> {
    const { clusterNumber, search, related, data, from, to } = query;
    const searchQuery = SearchQueryBuilder.video(
      'video-' + clusterNumber,
      search,
      related,
      data,
      from,
      to,
    );

    return await this.fullScan<T>(searchQuery, (doc) => doc);
  }

  async findVideoPaging(arg: IFindVideoPageDao): Promise<IPagingRes> {
    const { cluster, limit, search, related, last, data } = arg;
    const searchQuery = SearchQueryBuilder.videoSearchAfter(
      'video-' + cluster,
      limit,
      search,
      related,
      last,
      data,
    );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }

  /**
   * 비디오 히스토리의 마지막을 찾아 리턴
   * @param arg
   */
  async findVideosWithLastVideoHistory<T>(
    arg: FindVideoDateQuery,
  ): Promise<T[] | ScrollApiError> {
    const { clusterNumber, keyword, relationKeyword } = arg;
    let searchQuery = SearchQueryBuilder.video(
      clusterNumber,
      keyword,
      relationKeyword,
    );
    return await this.fullScan<T>(searchQuery, (doc) => doc);
  }

  async findVideoInfo(
    clusterNumber: string,
    id: string,
  ): Promise<IdocRes<IVideo>> {
    const searchQuery = SearchQueryBuilder.individualVideo(clusterNumber, id);
    const observable$ = from(
      this.client
        .get(searchQuery)
        .then((res) => {
          if (res.body.found) {
            return res.body as IdocRes<IVideo>;
          }
        })
        .catch((err) => {
          if (!err.meta.body.found) return Err(new VideoNotFoundError());
          return err;
        }),
    );

    return await lastValueFrom(observable$);
  }

  async findVideoMultiIndexPaging(
    arg: FindVideoPageV2Dto,
  ): Promise<IPagingRes> {
    const { search, related, last, limit } = arg;
    const multiIndex = arg.clusterNumbers
      .map((item) => 'video-' + item)
      .join(',');
    const searchQuery = SearchQueryBuilder.videoSearchAfter(
      multiIndex,
      limit,
      search,
      related,
      last,
    );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }
}
