import {
  VideoCategoryOutboundPort,
  VideoCategoryResult,
} from '@Apps/modules/video/domain/ports/video.category.outbound.port';
import { CategoryIssueVideoQueryParams } from '@Apps/modules/video/application/dtos/find-category-issue-video.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import { OpenSearchCommonHelper } from '@Apps/common/opensearch/service/helpers/common.helper';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

@Injectable()
export class VideoCategoryAdapter implements VideoCategoryOutboundPort {
  private readonly openSearchHelper: OpenSearchCommonHelper;

  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {
    this.openSearchHelper = new OpenSearchCommonHelper(this.opensearchClient);
  }

  async execute(
    dao: CategoryIssueVideoQueryParams,
  ): Promise<VideoCategoryResult> {
    try {
      const { index } = await this.openSearchHelper.findLargestBackingIndex(
        'video_history',
      );
      const query = {
        index,
        size: 0,
        body: {
          query: {
            bool: {
              must: [
                {
                  range: {
                    video_published: {
                      gte: dao.from,
                      lte: dao.to,
                    },
                  },
                },
                {
                  terms: {
                    video_cluster: dao.categoryNumbers.map(Number),
                  },
                },
              ],
            },
          },
          aggs: {
            top_videos: {
              terms: {
                script: {
                  source:
                    "double avgViews = 0; if (doc.containsKey('video_views') && doc['video_views'].size() > 0 && doc.containsKey('video_published') && doc['video_published'].size() > 0) { double views = doc['video_views'].value; long publishedDate = doc['video_published'].value.toInstant().toEpochMilli(); long currentDate = new Date().getTime(); double daysSincePublished = ((currentDate - publishedDate) / (1000 * 60 * 60 * 24)); avgViews = daysSincePublished > 0 ? (views / daysSincePublished) : 0; } return avgViews;",
                  lang: 'painless',
                },
                size: dao.limit,
                order: {
                  _key: 'desc',
                },
              },
              aggs: {
                top_hits: {
                  top_hits: {
                    size: 1,
                    _source: [
                      'video_id',
                      'video_views',
                      'video_published',
                      'video_cluster',
                      'video_title',
                      'channel_name',
                      'avgViews: _key', // Here we map the calculated value to the source
                    ],
                  },
                },
              },
            },
          },
        },
      };
      const response = await this.opensearchClient.search(query);
      const topVideos = response.body.aggregations.top_videos.buckets.map(
        (bucket: any) => {
          const source = bucket.top_hits.hits.hits[0]._source;
          return {
            ...source,
            avgViews: bucket.key, // Add the average views to each video
          };
        },
      );
      if (topVideos.length === 0) {
        return Err(new VideoHistoryNotFoundError());
      }
      return Ok(topVideos);
    } catch (e) {
      console.error('Error fetching video history:', e);
      return Err(e);
    }
  }
}
