import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';

export class SearchQueryBuilder {
  static video(
    index: string,
    keyword: string,
    relWord: string,
    data?: VIDEO_DATA_KEY[],
    from?: string,
    to?: string,
    size: number = 100,
  ) {
    const relWords = relWord.split(/\s+/);

    return {
      index,
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  filter: [
                    {
                      bool: {
                        must: [
                          {
                            multi_match: {
                              query: keyword,
                              fields: ['video_tags', 'video_title'],
                            },
                          },
                          ...relWords.map((word) => ({
                            multi_match: {
                              query: word,
                              fields: ['video_tags', 'video_title'],
                            },
                          })),
                        ],
                      },
                    },
                  ],
                },
              },
              {
                nested: {
                  path: 'video_history',
                  query: {
                    range: {
                      'video_history.crawled_date': {
                        gte: `${from} 00:00:00`,
                        lte: `${to} 23:59:59`,
                      },
                    },
                  },
                  inner_hits: {
                    name: 'video_history',
                    size,
                  },
                },
              },
            ],
          },
        },
        _source: data || false,
      },
    };
  }

  static individualVideo(clusterNumber: string, id: string) {
    return {
      index: 'video-' + clusterNumber,
      id,
    };
  }

  static videoSearchAfter(
    cluster: string,
    limit: number,
    search: string,
    related: string,
    last?: string,
    data?: VIDEO_DATA_KEY[] | true,
  ) {
    const relWords = related?.split(/\s+/);

    let searchQuery = {
      index: cluster,
      size: limit,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  filter: [
                    {
                      bool: {
                        must: [
                          {
                            multi_match: {
                              query: search,
                              fields: ['video_tags', 'video_title'],
                            },
                          },
                          ...relWords.map((word) => ({
                            multi_match: {
                              query: word,
                              fields: ['video_tags', 'video_title'],
                            },
                          })),
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        _source: data || false,
        sort: ['_id'],
      },
    };

    if (last) searchQuery.body['search_after'] = [last];

    return searchQuery;
  }
}
