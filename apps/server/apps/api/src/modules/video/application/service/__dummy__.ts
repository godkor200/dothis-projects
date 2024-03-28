import { IVideoHistory } from '@Apps/modules/video/application/dtos/find-video.os.res';
import { GetRelatedVideoHistory } from '@Apps/modules/video/infrastructure/daos/video.dao';
import { TGetVideoViewsMatchingSearchOnSpecificDateRes } from '@Apps/modules/video/domain/ports/video.outbound.port';
import { GetVideoViewsPerformanceMatchingSearchOnSpecificDate } from '@Apps/modules/video/infrastructure/daos/video.res';
import { Ok } from 'oxide.ts';
export type TData = Pick<
  GetRelatedVideoHistory,
  'videoId' | 'videoLikes' | 'videoViews' | 'year' | 'month' | 'day'
>;
export function createDummyData(
  numEntries: number,
  numEntriesPerId: number,
): TData[] {
  let dummyData: TData[] = [];
  let currentViews: number = 0;
  for (let i = 0; i < numEntries; i++) {
    // 일정 주기로 비디오 아이디를 변경합니다
    let currentVideoId = `vid${Math.floor(i / numEntriesPerId) + 1}`;
    // videoViews가 계속 증가하도록 조정
    currentViews += Math.floor(i / numEntriesPerId) + 1;
    // day는 한 videoId당 중복 없이 증가
    let currentDay = (i % numEntriesPerId) + 1;
    let data: TData = {
      videoId: currentVideoId,
      videoViews: currentViews,
      year: 2024,
      month: 1,
      day: currentDay,
      videoLikes: 0,
    };
    dummyData.push(data);
  }

  return dummyData;
}

// 데이터 비교군
export const oneToTen: IVideoHistory[] = [
  {
    _index: 'video-20',
    _id: 'mzwyOrDzCx8',
    _score: 12.888937,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2443,
                video_likes: 76,
                crawled_date: '2023-12-01 10:51:32',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2443,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:23',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2452,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:26',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'U2YTUI-d4lw',
    _score: 12.555458,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 443,
                video_likes: 25,
                crawled_date: '2023-12-01 10:56:27',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 444,
                video_likes: 25,
                crawled_date: '2023-12-02 22:41:46',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 444,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:47',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'DDCTJD1WWEw',
    _score: 11.88429,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12479,
                video_likes: 0,
                crawled_date: '2023-12-01 10:51:40',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12483,
                video_likes: 297,
                crawled_date: '2023-12-02 22:39:26',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12498,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:28',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'xUjX-ESnBUU',
    _score: 11.018515,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2942,
                video_likes: 50,
                crawled_date: '2023-12-01 11:01:51',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2944,
                video_likes: 50,
                crawled_date: '2023-12-02 22:47:41',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2957,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:55',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'mjouYqPGaPA',
    _score: 10.998594,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3184,
                video_likes: 0,
                crawled_date: '2023-12-01 10:53:29',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3186,
                video_likes: 18,
                crawled_date: '2023-12-02 22:40:15',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3200,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:15',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'IuCjJ2g5TtM',
    _score: 10.787593,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-01 10:50:58',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:09',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:00',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'EX7kPe6lKb0',
    _score: 10.771958,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7252,
                video_likes: 158,
                crawled_date: '2023-12-01 10:55:02',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7256,
                video_likes: 159,
                crawled_date: '2023-12-02 22:41:08',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7260,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:47',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RVfQAqas3d8',
    _score: 10.70693,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-01 10:52:39',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:47',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:12',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RDqta4lqawY',
    _score: 10.663538,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 24461,
                video_likes: 107,
                crawled_date: '2023-12-01 11:02:29',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 24603,
                video_likes: 0,
                crawled_date: '2023-12-02 22:48:30',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 25590,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:34',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'gC8g-CuAQus',
    _score: 10.617884,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 502,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:27',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 502,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:54',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 504,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:17',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'iBSxZuYxPBQ',
    _score: 10.530831,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:47',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-02 22:40:57',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:33',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'f-PnqdEyz98',
    _score: 10.506075,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14772,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:08',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14786,
                video_likes: 218,
                crawled_date: '2023-12-02 22:40:39',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14819,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'lrYm2s1L-ug',
    _score: 10.383951,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 240,
                crawled_date: '2023-12-01 11:02:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 240,
                crawled_date: '2023-12-02 22:48:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '4kzTym7DQNw',
    _score: 10.368401,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 0,
                crawled_date: '2023-12-01 10:55:28',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 274,
                crawled_date: '2023-12-02 22:41:20',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'CUMIlKIbn5A',
    _score: 10.316633,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 0,
                crawled_date: '2023-12-01 10:55:29',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 375,
                crawled_date: '2023-12-02 22:41:21',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'sFCQtrtUBuk',
    _score: 10.24822,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 2,
                crawled_date: '2023-12-01 10:49:40',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 2,
                crawled_date: '2023-12-02 22:38:30',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:25',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'YjjlEojXoc4',
    _score: 10.219301,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 6986,
                video_likes: 130,
                crawled_date: '2023-12-01 10:51:58',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 6994,
                video_likes: 130,
                crawled_date: '2023-12-02 22:39:31',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 7054,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:41',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'UBXdqxn0WTo',
    _score: 10.214366,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47093,
                video_likes: 530,
                crawled_date: '2023-12-01 10:51:59',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47097,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:31',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47106,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:41',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'OQyzC2MeV6c',
    _score: 10.192089,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 3,
                crawled_date: '2023-12-01 10:51:22',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 3,
                crawled_date: '2023-12-02 22:39:18',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:19',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '6OcF21FfZzs',
    _score: 10.132117,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 7,
                crawled_date: '2023-12-01 11:01:42',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 7,
                crawled_date: '2023-12-02 22:47:30',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:49',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'NjM_9lQx5nk',
    _score: 10.070824,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2544,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:08',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2546,
                video_likes: 72,
                crawled_date: '2023-12-02 22:40:39',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2548,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'Ma00iCBp4-k',
    _score: 10.017521,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 263,
                video_likes: 13,
                crawled_date: '2023-12-01 11:01:36',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 262,
                video_likes: 0,
                crawled_date: '2023-12-02 22:47:22',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 265,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:45',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'WEdMk11w3bM',
    _score: 9.890883,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 26,
                crawled_date: '2023-12-01 11:01:29',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 0,
                crawled_date: '2023-12-02 22:47:12',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'ovj9TirNr2M',
    _score: 9.769374,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:23',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:13',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'bTEDMtBa7bQ',
    _score: 9.719983,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 0,
                crawled_date: '2023-12-01 10:52:40',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 170,
                crawled_date: '2023-12-02 22:39:47',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:12',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'maGDBae-HdE',
    _score: 9.708152,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1232,
                video_likes: 46,
                crawled_date: '2023-12-01 11:04:19',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1232,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:47',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1234,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vlOJhRHUrDU',
    _score: 9.67451,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 792,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:08',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 793,
                video_likes: 28,
                crawled_date: '2023-12-02 22:40:39',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 793,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'C5IKxN8oaU0',
    _score: 9.666898,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1188,
                video_likes: 0,
                crawled_date: '2023-12-01 10:55:28',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1188,
                video_likes: 0,
                crawled_date: '2023-12-02 22:41:20',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1189,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dza5o_C8vvU',
    _score: 9.658567,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 0,
                crawled_date: '2023-12-01 11:02:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 623,
                crawled_date: '2023-12-02 22:48:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'YnbyXFdUd3k',
    _score: 9.535466,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 556,
                video_likes: 33,
                crawled_date: '2023-12-01 11:01:28',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 556,
                video_likes: 0,
                crawled_date: '2023-12-02 22:47:11',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 558,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'jdH2MJy8-Sc',
    _score: 9.508667,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 936,
                video_likes: 43,
                crawled_date: '2023-12-01 11:03:56',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 937,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:33',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 937,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:53',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'At6zlQOx_dI',
    _score: 9.505642,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1345,
                video_likes: 34,
                crawled_date: '2023-12-01 11:01:29',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1346,
                video_likes: 34,
                crawled_date: '2023-12-02 22:47:12',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1351,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'LW3pIQM8KuY',
    _score: 9.479518,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 9,
                crawled_date: '2023-12-01 11:03:25',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 9,
                crawled_date: '2023-12-02 22:49:14',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:26',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'C-Wf5RjDrVY',
    _score: 9.464504,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 13,
                crawled_date: '2023-12-01 11:00:25',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 13,
                crawled_date: '2023-12-02 22:45:48',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:02',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vr18xoddjUE',
    _score: 9.4215,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 0,
                crawled_date: '2023-12-01 11:03:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 15,
                crawled_date: '2023-12-02 22:49:33',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:52',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_SYyQenqsaM',
    _score: 9.368015,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25983,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:19',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25983,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:47',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25984,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'UQrAYsh_9zs',
    _score: 9.364477,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 0,
                crawled_date: '2023-12-01 10:49:40',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 14,
                crawled_date: '2023-12-02 22:38:30',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:25',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'Iiao7FjBpHk',
    _score: 9.35797,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2361,
                video_likes: 52,
                crawled_date: '2023-12-01 10:49:58',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2363,
                video_likes: 53,
                crawled_date: '2023-12-02 22:38:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2368,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:35',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'eerK77e1-pY',
    _score: 9.28481,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 765,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:08',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 766,
                video_likes: 54,
                crawled_date: '2023-12-02 22:40:39',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 766,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dAf3-KwI9ls',
    _score: 9.279458,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3080,
                video_likes: 0,
                crawled_date: '2023-12-01 11:03:23',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3081,
                video_likes: 88,
                crawled_date: '2023-12-02 22:49:12',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3085,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:24',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'qBTlETs2nQ0',
    _score: 9.2506,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 0,
                crawled_date: '2023-12-01 10:52:40',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 304,
                crawled_date: '2023-12-02 22:39:47',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:14',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '4RguEXWSxIU',
    _score: 9.236161,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1904,
                video_likes: 0,
                crawled_date: '2023-12-01 11:01:29',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1904,
                video_likes: 0,
                crawled_date: '2023-12-02 22:47:11',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1905,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'pjvpJdd80zg',
    _score: 9.219634,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2126,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:01',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2126,
                video_likes: 47,
                crawled_date: '2023-12-02 22:49:36',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2131,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:56',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'behotYsFUNA',
    _score: 9.2101965,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-01 10:51:58',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:31',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:40',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'jnyPjS4VBGg',
    _score: 9.093592,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 602,
                video_likes: 0,
                crawled_date: '2023-12-01 10:51:25',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 602,
                video_likes: 0,
                crawled_date: '2023-12-02 22:39:20',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 607,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:20',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'w66Z3JUW2yo',
    _score: 9.010567,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3412,
                video_likes: 0,
                crawled_date: '2023-12-01 11:00:13',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3412,
                video_likes: 53,
                crawled_date: '2023-12-02 22:45:25',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3415,
                video_likes: 0,
                crawled_date: '2023-12-08 09:38:42',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '8epTHuOohaM',
    _score: 9.005735,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 775,
                video_likes: 0,
                crawled_date: '2023-12-01 10:54:33',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 775,
                video_likes: 0,
                crawled_date: '2023-12-02 22:40:51',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 776,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:19',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'J5ZkMQjQqZA',
    _score: 8.82898,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 485,
                video_likes: 0,
                crawled_date: '2023-12-01 11:02:13',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 488,
                video_likes: 0,
                crawled_date: '2023-12-02 22:48:08',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 497,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:16',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '2QF4P1zCaHA',
    _score: 8.74391,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14128,
                video_likes: 408,
                crawled_date: '2023-12-01 10:49:59',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14139,
                video_likes: 407,
                crawled_date: '2023-12-02 22:38:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14185,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:36',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dQo31aamxAc',
    _score: 8.741487,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6949,
                video_likes: 174,
                crawled_date: '2023-12-01 10:49:58',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6950,
                video_likes: 0,
                crawled_date: '2023-12-02 22:38:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6954,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:35',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'KMo8ESa1aSk',
    _score: 8.713229,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-01 10:55:48',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-02 22:41:31',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:18',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'iro2PkUuEME',
    _score: 8.6924925,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:27',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 16,
                crawled_date: '2023-12-02 22:49:53',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:16',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RcLhkKQymIw',
    _score: 8.64626,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 112,
                crawled_date: '2023-12-01 11:04:19',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:47',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:12',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '1hxP6okUOos',
    _score: 8.6298895,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 5,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3256,
                video_likes: 110,
                crawled_date: '2023-12-01 10:53:14',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3256,
                video_likes: 0,
                crawled_date: '2023-12-02 22:40:03',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3279,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:59',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_h_Engb4NFg',
    _score: 8.284696,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 644,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:23',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 644,
                video_likes: 0,
                crawled_date: '2023-12-02 22:49:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 645,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:13',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'wqqUl5YUheY',
    _score: 8.13938,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20540,
                video_likes: 330,
                crawled_date: '2023-12-01 11:01:14',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20581,
                video_likes: 330,
                crawled_date: '2023-12-02 22:46:49',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20762,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:31',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_W9dBpuhH7s',
    _score: 7.863328,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8411,
                video_likes: 98,
                crawled_date: '2023-12-01 11:04:19',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8413,
                video_likes: 98,
                crawled_date: '2023-12-02 22:49:47',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8443,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'ydVFJQYYdn8',
    _score: 7.5344605,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 451,
                video_likes: 18,
                crawled_date: '2023-12-01 11:03:57',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 452,
                video_likes: 18,
                crawled_date: '2023-12-02 22:49:33',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 460,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:53',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'eizsQdRRhNk',
    _score: 7.3551445,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 0,
                crawled_date: '2023-12-01 11:04:19',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 25,
                crawled_date: '2023-12-02 22:49:47',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vemZ87D8rXU',
    _score: 7.0532894,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 5,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 6,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4823,
                video_likes: 0,
                crawled_date: '2023-12-01 11:02:29',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4823,
                video_likes: 103,
                crawled_date: '2023-12-02 22:48:30',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4825,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:34',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
          ],
        },
      },
    },
  },
];

export const fourToTen: IVideoHistory[] = [
  {
    _index: 'video-20',
    _id: 'mzwyOrDzCx8',
    _score: 12.856215,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2452,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:26',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2452,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:08',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
            {
              _index: 'video-20',
              _id: 'mzwyOrDzCx8',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 2456,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:12',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'mzwyOrDzCx8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'U2YTUI-d4lw',
    _score: 12.525526,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 444,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:47',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 444,
                video_likes: 0,
                crawled_date: '2023-12-09 09:49:11',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
            {
              _index: 'video-20',
              _id: 'U2YTUI-d4lw',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 444,
                video_likes: 0,
                crawled_date: '2023-12-10 10:08:17',
                channel_id: 'UCjf8_OSNvMwAzj9z-_rSWsw',
                video_id: 'U2YTUI-d4lw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'DDCTJD1WWEw',
    _score: 11.852943,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12498,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:28',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12500,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:14',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
            {
              _index: 'video-20',
              _id: 'DDCTJD1WWEw',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 12499,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:17',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'DDCTJD1WWEw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'xUjX-ESnBUU',
    _score: 11.025677,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2957,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:55',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2959,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:01',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
            {
              _index: 'video-20',
              _id: 'xUjX-ESnBUU',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 2964,
                video_likes: 0,
                crawled_date: '2023-12-10 10:14:23',
                channel_id: 'UCssVWsvAyLzoJQtVy78WTgg',
                video_id: 'xUjX-ESnBUU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'mjouYqPGaPA',
    _score: 10.971101,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3200,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:15',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3207,
                video_likes: 0,
                crawled_date: '2023-12-09 09:46:44',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
            {
              _index: 'video-20',
              _id: 'mjouYqPGaPA',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 3,
                video_views: 3211,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:22',
                channel_id: 'UCRZPuKvyKeuaq84Wge3yKhg',
                video_id: 'mjouYqPGaPA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'EX7kPe6lKb0',
    _score: 10.7971325,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7260,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:47',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7264,
                video_likes: 0,
                crawled_date: '2023-12-09 09:48:13',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
            {
              _index: 'video-20',
              _id: 'EX7kPe6lKb0',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 7264,
                video_likes: 0,
                crawled_date: '2023-12-10 10:07:45',
                channel_id: 'UCD3UooIG6x6vxFOhHwYEXEw',
                video_id: 'EX7kPe6lKb0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'IuCjJ2g5TtM',
    _score: 10.763192,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:00',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:49',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
            {
              _index: 'video-20',
              _id: 'IuCjJ2g5TtM',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 147,
                video_views: 406,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:55',
                channel_id: 'UCzLFmtMhaQ2KL-_OZr_j18g',
                video_id: 'IuCjJ2g5TtM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RDqta4lqawY',
    _score: 10.687084,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 25590,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:34',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 25781,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:32',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
            {
              _index: 'video-20',
              _id: 'RDqta4lqawY',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 26024,
                video_likes: 0,
                crawled_date: '2023-12-10 10:15:44',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'RDqta4lqawY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RVfQAqas3d8',
    _score: 10.680001,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:12',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:55',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
            {
              _index: 'video-20',
              _id: 'RVfQAqas3d8',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 129,
                video_views: 2416,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'RVfQAqas3d8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'f-PnqdEyz98',
    _score: 10.530559,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14819,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14818,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:27',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
            {
              _index: 'video-20',
              _id: 'f-PnqdEyz98',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 30,
                video_views: 14835,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'f-PnqdEyz98',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'iBSxZuYxPBQ',
    _score: 10.50373,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:33',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:56',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'iBSxZuYxPBQ',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 310,
                video_likes: 0,
                crawled_date: '2023-12-10 10:00:43',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'iBSxZuYxPBQ',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'gC8g-CuAQus',
    _score: 10.465672,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 504,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:17',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 505,
                video_likes: 0,
                crawled_date: '2023-12-09 09:56:07',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
            {
              _index: 'video-20',
              _id: 'gC8g-CuAQus',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 68,
                video_views: 505,
                video_likes: 0,
                crawled_date: '2023-12-10 10:19:01',
                channel_id: 'UCjJoOZ1_HjWdbjidIRO0Xbg',
                video_id: 'gC8g-CuAQus',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '4kzTym7DQNw',
    _score: 10.341139,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 0,
                crawled_date: '2023-12-09 09:48:28',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
            {
              _index: 'video-20',
              _id: '4kzTym7DQNw',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 138,
                video_views: 2055,
                video_likes: 0,
                crawled_date: '2023-12-10 10:07:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '4kzTym7DQNw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'CUMIlKIbn5A',
    _score: 10.321495,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 0,
                crawled_date: '2023-12-09 09:48:28',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
            {
              _index: 'video-20',
              _id: 'CUMIlKIbn5A',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 118,
                video_views: 3025,
                video_likes: 0,
                crawled_date: '2023-12-10 10:07:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'CUMIlKIbn5A',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'sFCQtrtUBuk',
    _score: 10.2551155,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:25',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:12',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
            {
              _index: 'video-20',
              _id: 'sFCQtrtUBuk',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 230,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:21',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'sFCQtrtUBuk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'lrYm2s1L-ug',
    _score: 10.236238,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:51',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
            {
              _index: 'video-20',
              _id: 'lrYm2s1L-ug',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 44,
                video_views: 2224,
                video_likes: 0,
                crawled_date: '2023-12-10 10:16:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'lrYm2s1L-ug',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'YjjlEojXoc4',
    _score: 10.193459,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 7054,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:41',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 7062,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:28',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
            {
              _index: 'video-20',
              _id: 'YjjlEojXoc4',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 7073,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:29',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'YjjlEojXoc4',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'UBXdqxn0WTo',
    _score: 10.190243,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47106,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:41',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47106,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:28',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
            {
              _index: 'video-20',
              _id: 'UBXdqxn0WTo',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 47109,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:29',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'UBXdqxn0WTo',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'OQyzC2MeV6c',
    _score: 10.165411,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:19',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:59',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
            {
              _index: 'video-20',
              _id: 'OQyzC2MeV6c',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 259,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:05',
                channel_id: 'UCtsi5d-Ukf8jMA_prrVEgiw',
                video_id: 'OQyzC2MeV6c',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '6OcF21FfZzs',
    _score: 10.106249,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:49',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:54',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
            {
              _index: 'video-20',
              _id: '6OcF21FfZzs',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 475,
                video_likes: 0,
                crawled_date: '2023-12-10 10:14:10',
                channel_id: 'UCk-rlf99uFhzNSu5VrhNsmA',
                video_id: '6OcF21FfZzs',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'NjM_9lQx5nk',
    _score: 9.928824,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2548,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2548,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:27',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
            {
              _index: 'video-20',
              _id: 'NjM_9lQx5nk',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 46,
                video_views: 2550,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'NjM_9lQx5nk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'Ma00iCBp4-k',
    _score: 9.876966,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 265,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:45',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 265,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:50',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
            {
              _index: 'video-20',
              _id: 'Ma00iCBp4-k',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 266,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:59',
                channel_id: 'UCHwW3wgcLmW0WID0Z07rlPQ',
                video_id: 'Ma00iCBp4-k',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'WEdMk11w3bM',
    _score: 9.751436,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:43',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
            {
              _index: 'video-20',
              _id: 'WEdMk11w3bM',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 11,
                video_views: 560,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:49',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'WEdMk11w3bM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'ovj9TirNr2M',
    _score: 9.744225,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:13',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:59',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
            {
              _index: 'video-20',
              _id: 'ovj9TirNr2M',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 100,
                video_views: 7937,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'ovj9TirNr2M',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'C5IKxN8oaU0',
    _score: 9.671032,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1189,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:01',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1189,
                video_likes: 0,
                crawled_date: '2023-12-09 09:48:28',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
            {
              _index: 'video-20',
              _id: 'C5IKxN8oaU0',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 47,
                video_views: 1189,
                video_likes: 0,
                crawled_date: '2023-12-10 10:07:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'C5IKxN8oaU0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vlOJhRHUrDU',
    _score: 9.649454,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 793,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 793,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:27',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vlOJhRHUrDU',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 793,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vlOJhRHUrDU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'bTEDMtBa7bQ',
    _score: 9.583029,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:12',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:55',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
            {
              _index: 'video-20',
              _id: 'bTEDMtBa7bQ',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 94,
                video_views: 1156,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'bTEDMtBa7bQ',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'maGDBae-HdE',
    _score: 9.573025,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1234,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1234,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:57',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
            {
              _index: 'video-20',
              _id: 'maGDBae-HdE',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 4,
                video_views: 1234,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:51',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'maGDBae-HdE',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'YnbyXFdUd3k',
    _score: 9.556096,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 558,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 558,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:43',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
            {
              _index: 'video-20',
              _id: 'YnbyXFdUd3k',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 15,
                video_views: 558,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:49',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'YnbyXFdUd3k',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dza5o_C8vvU',
    _score: 9.522395,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:51',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
            {
              _index: 'video-20',
              _id: 'dza5o_C8vvU',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 73,
                video_views: 9115,
                video_likes: 0,
                crawled_date: '2023-12-10 10:16:50',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'dza5o_C8vvU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'At6zlQOx_dI',
    _score: 9.509151,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1351,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1352,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:43',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
            {
              _index: 'video-20',
              _id: 'At6zlQOx_dI',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 12,
                video_views: 1353,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:49',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'At6zlQOx_dI',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'jdH2MJy8-Sc',
    _score: 9.483887,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 937,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:53',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 937,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
            {
              _index: 'video-20',
              _id: 'jdH2MJy8-Sc',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 937,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:20',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'jdH2MJy8-Sc',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'C-Wf5RjDrVY',
    _score: 9.48289,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:02',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:05',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
            {
              _index: 'video-20',
              _id: 'C-Wf5RjDrVY',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 389,
                video_likes: 0,
                crawled_date: '2023-12-10 10:12:14',
                channel_id: 'UC0Kkrs0NAZ_nk5DM6N7Frgg',
                video_id: 'C-Wf5RjDrVY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_SYyQenqsaM',
    _score: 9.370708,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25984,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25985,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:57',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
            {
              _index: 'video-20',
              _id: '_SYyQenqsaM',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 36,
                video_views: 25985,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:51',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: '_SYyQenqsaM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'UQrAYsh_9zs',
    _score: 9.370302,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:25',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:12',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
            {
              _index: 'video-20',
              _id: 'UQrAYsh_9zs',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 745,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:21',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'UQrAYsh_9zs',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'Iiao7FjBpHk',
    _score: 9.361248,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2368,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:35',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2368,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:24',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
            {
              _index: 'video-20',
              _id: 'Iiao7FjBpHk',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 16,
                video_views: 2369,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:32',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'Iiao7FjBpHk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'LW3pIQM8KuY',
    _score: 9.353625,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:26',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:18',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
            {
              _index: 'video-20',
              _id: 'LW3pIQM8KuY',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 2,
                video_views: 166,
                video_likes: 0,
                crawled_date: '2023-12-10 10:17:39',
                channel_id: 'UCOlWvJOqXI0E09yCMughXCg',
                video_id: 'LW3pIQM8KuY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vr18xoddjUE',
    _score: 9.28871,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:52',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
            {
              _index: 'video-20',
              _id: 'vr18xoddjUE',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 6,
                video_views: 218,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:19',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'vr18xoddjUE',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '4RguEXWSxIU',
    _score: 9.255621,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1905,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:40',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1907,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:43',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
            {
              _index: 'video-20',
              _id: '4RguEXWSxIU',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 39,
                video_views: 1907,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:49',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '4RguEXWSxIU',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'behotYsFUNA',
    _score: 9.235884,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:40',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:27',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
            {
              _index: 'video-20',
              _id: 'behotYsFUNA',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 0,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:29',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'behotYsFUNA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'pjvpJdd80zg',
    _score: 9.222694,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2131,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:56',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2132,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:45',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
            {
              _index: 'video-20',
              _id: 'pjvpJdd80zg',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 25,
                video_views: 2132,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:29',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'pjvpJdd80zg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dAf3-KwI9ls',
    _score: 9.158149,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3085,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:24',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3085,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:16',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
            {
              _index: 'video-20',
              _id: 'dAf3-KwI9ls',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 14,
                video_views: 3085,
                video_likes: 0,
                crawled_date: '2023-12-10 10:17:36',
                channel_id: 'UCc304QpqtMOfYHra9VJ4CKQ',
                video_id: 'dAf3-KwI9ls',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'eerK77e1-pY',
    _score: 9.153956,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 766,
                video_likes: 0,
                crawled_date: '2023-12-08 09:32:55',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 766,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:27',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
            {
              _index: 'video-20',
              _id: 'eerK77e1-pY',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 20,
                video_views: 766,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:41',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'eerK77e1-pY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'qBTlETs2nQ0',
    _score: 9.120302,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:14',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:56',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
            {
              _index: 'video-20',
              _id: 'qBTlETs2nQ0',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 87,
                video_views: 3617,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:52',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: 'qBTlETs2nQ0',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'jnyPjS4VBGg',
    _score: 9.070069,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 607,
                video_likes: 0,
                crawled_date: '2023-12-08 09:30:20',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 608,
                video_likes: 0,
                crawled_date: '2023-12-09 09:45:01',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
            {
              _index: 'video-20',
              _id: 'jnyPjS4VBGg',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 610,
                video_likes: 0,
                crawled_date: '2023-12-10 09:58:08',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: 'jnyPjS4VBGg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '8epTHuOohaM',
    _score: 9.026297,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 776,
                video_likes: 0,
                crawled_date: '2023-12-08 09:33:19',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 776,
                video_likes: 0,
                crawled_date: '2023-12-09 09:47:46',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
            {
              _index: 'video-20',
              _id: '8epTHuOohaM',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 776,
                video_likes: 0,
                crawled_date: '2023-12-10 10:00:00',
                channel_id: 'UCkjk77yUtLnuSalpGrlrG2Q',
                video_id: '8epTHuOohaM',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'w66Z3JUW2yo',
    _score: 8.906778,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3415,
                video_likes: 0,
                crawled_date: '2023-12-08 09:38:42',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3415,
                video_likes: 0,
                crawled_date: '2023-12-09 09:52:48',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
            {
              _index: 'video-20',
              _id: 'w66Z3JUW2yo',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 21,
                video_views: 3415,
                video_likes: 0,
                crawled_date: '2023-12-10 10:11:39',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'w66Z3JUW2yo',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'J5ZkMQjQqZA',
    _score: 8.803267,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 497,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:16',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 500,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:18',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
            {
              _index: 'video-20',
              _id: 'J5ZkMQjQqZA',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 1,
                video_views: 505,
                video_likes: 0,
                crawled_date: '2023-12-10 10:14:56',
                channel_id: 'UCPdyoq6nH2rjSI3SEZPL8gQ',
                video_id: 'J5ZkMQjQqZA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'dQo31aamxAc',
    _score: 8.759031,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6954,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:35',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6954,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:24',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
            {
              _index: 'video-20',
              _id: 'dQo31aamxAc',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 26,
                video_views: 6955,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:32',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: 'dQo31aamxAc',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '2QF4P1zCaHA',
    _score: 8.746249,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14185,
                video_likes: 0,
                crawled_date: '2023-12-08 09:29:36',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14193,
                video_likes: 0,
                crawled_date: '2023-12-09 09:44:24',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
            {
              _index: 'video-20',
              _id: '2QF4P1zCaHA',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 84,
                video_views: 14197,
                video_likes: 0,
                crawled_date: '2023-12-10 09:57:32',
                channel_id: 'UCB713gNK96WX4AqTbfRVsbQ',
                video_id: '2QF4P1zCaHA',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'RcLhkKQymIw',
    _score: 8.652743,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:12',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:57',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
            {
              _index: 'video-20',
              _id: 'RcLhkKQymIw',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 2393,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:51',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'RcLhkKQymIw',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '1hxP6okUOos',
    _score: 8.609495,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 7,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3279,
                video_likes: 0,
                crawled_date: '2023-12-08 09:31:59',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3282,
                video_likes: 0,
                crawled_date: '2023-12-09 09:46:29',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
            {
              _index: 'video-20',
              _id: '1hxP6okUOos',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 8,
                video_views: 3283,
                video_likes: 0,
                crawled_date: '2023-12-10 09:59:15',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: '1hxP6okUOos',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'KMo8ESa1aSk',
    _score: 8.590479,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-08 09:34:18',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-09 09:48:42',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
            {
              _index: 'video-20',
              _id: 'KMo8ESa1aSk',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 5,
                video_views: 467,
                video_likes: 0,
                crawled_date: '2023-12-10 10:07:59',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'KMo8ESa1aSk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'iro2PkUuEME',
    _score: 8.571436,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:16',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 0,
                crawled_date: '2023-12-09 09:56:06',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
            {
              _index: 'video-20',
              _id: 'iro2PkUuEME',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 10,
                video_views: 146,
                video_likes: 0,
                crawled_date: '2023-12-10 10:19:00',
                channel_id: 'UCPrC98bl73i1hfEp2HUJV5w',
                video_id: 'iro2PkUuEME',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_h_Engb4NFg',
    _score: 8.171464,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 645,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:13',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 645,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:59',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
            {
              _index: 'video-20',
              _id: '_h_Engb4NFg',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 22,
                video_views: 645,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:54',
                channel_id: 'UCG3EWj0-R_Zc1h0ha021rwQ',
                video_id: '_h_Engb4NFg',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'wqqUl5YUheY',
    _score: 8.028058,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20762,
                video_likes: 0,
                crawled_date: '2023-12-08 09:39:31',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20784,
                video_likes: 0,
                crawled_date: '2023-12-09 09:53:34',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
            {
              _index: 'video-20',
              _id: 'wqqUl5YUheY',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 28,
                video_views: 20800,
                video_likes: 0,
                crawled_date: '2023-12-10 10:13:29',
                channel_id: 'UCrC5IxCbE7BwNkEyDOEGo4g',
                video_id: 'wqqUl5YUheY',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: '_W9dBpuhH7s',
    _score: 7.771699,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8443,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8450,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:56',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
            {
              _index: 'video-20',
              _id: '_W9dBpuhH7s',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 18,
                video_views: 8460,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:50',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: '_W9dBpuhH7s',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'ydVFJQYYdn8',
    _score: 7.4321923,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 460,
                video_likes: 0,
                crawled_date: '2023-12-08 09:41:53',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 460,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:41',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
            {
              _index: 'video-20',
              _id: 'ydVFJQYYdn8',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 9,
                video_views: 460,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:22',
                channel_id: 'UC1JUP5e_8utEtToXGMSjMyw',
                video_id: 'ydVFJQYYdn8',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'eizsQdRRhNk',
    _score: 7.256445,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 0,
                crawled_date: '2023-12-08 09:42:11',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 0,
                crawled_date: '2023-12-09 09:55:57',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
            {
              _index: 'video-20',
              _id: 'eizsQdRRhNk',
              _nested: {
                field: 'video_history',
                offset: 11,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 0,
                video_views: 884,
                video_likes: 0,
                crawled_date: '2023-12-10 10:18:51',
                channel_id: 'UC7fyfh_b3OQKl9QDT0i3Lww',
                video_id: 'eizsQdRRhNk',
              },
            },
          ],
        },
      },
    },
  },
  {
    _index: 'video-20',
    _id: 'vemZ87D8rXU',
    _score: 6.95837,
    inner_hits: {
      video_history: {
        hits: {
          total: {
            value: 3,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 8,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4825,
                video_likes: 0,
                crawled_date: '2023-12-08 09:40:34',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 9,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4825,
                video_likes: 0,
                crawled_date: '2023-12-09 09:54:32',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
            {
              _index: 'video-20',
              _id: 'vemZ87D8rXU',
              _nested: {
                field: 'video_history',
                offset: 10,
              },
              _score: 1,
              _source: {
                performance: 0,
                video_comments: 29,
                video_views: 4825,
                video_likes: 0,
                crawled_date: '2023-12-10 10:15:44',
                channel_id: 'UCWtftqO1NJeNtYxBR_JeblQ',
                video_id: 'vemZ87D8rXU',
              },
            },
          ],
        },
      },
    },
  },
];

export const performanceLengthTestData: TGetVideoViewsMatchingSearchOnSpecificDateRes<GetVideoViewsPerformanceMatchingSearchOnSpecificDate> =
  Ok([
    {
      videoId: 'po-b6w0WJHM',
      videoViews: 12084,
      videoPerformance: null,
      videoDuration: 1278,
    },
    {
      videoId: '1xT4_cJSoOk',
      videoViews: 59,
      videoPerformance: null,
      videoDuration: 156,
    },
    {
      videoId: 'uHfjwdYm81M',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 508,
    },
    {
      videoId: 'zHdC34JQhGQ',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 3004,
    },
    {
      videoId: 'x5hRlRmQohc',
      videoViews: 251,
      videoPerformance: null,
      videoDuration: 1891,
    },
    {
      videoId: '400DcvY6TFg',
      videoViews: 691,
      videoPerformance: null,
      videoDuration: 40,
    },
    {
      videoId: 'KchJ6l04XW4',
      videoViews: 1030,
      videoPerformance: null,
      videoDuration: 163,
    },
    {
      videoId: '29G3g5RyUec',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 3124,
    },
    {
      videoId: '1XvP4uEjMfY',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1252,
    },
    {
      videoId: '9IG19MR0Hks',
      videoViews: 74,
      videoPerformance: null,
      videoDuration: 741,
    },
    {
      videoId: '91zR51qGPiE',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1622,
    },
    {
      videoId: 'A0IUyNyv9_Y',
      videoViews: 855,
      videoPerformance: null,
      videoDuration: 349,
    },
    {
      videoId: 'zDzeRsO_6Yk',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1648,
    },
    {
      videoId: 'CjaydTR6q-k',
      videoViews: 1053,
      videoPerformance: null,
      videoDuration: 269,
    },
    {
      videoId: 'mqPEojhxP5M',
      videoViews: 1940,
      videoPerformance: null,
      videoDuration: 130,
    },
    {
      videoId: 'eFaSfM2jC_E',
      videoViews: 17073,
      videoPerformance: null,
      videoDuration: 1178,
    },
    {
      videoId: 'f3K5hSj_Nm4',
      videoViews: 25,
      videoPerformance: null,
      videoDuration: 220,
    },
    {
      videoId: 'K50X9LLlB1Q',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1365,
    },
    {
      videoId: 'SFGqrJqfp8I',
      videoViews: 12629,
      videoPerformance: null,
      videoDuration: 986,
    },
    {
      videoId: 'aPLnXGHC93U',
      videoViews: 9423,
      videoPerformance: null,
      videoDuration: 138,
    },
    {
      videoId: 'aauBhtA0tFw',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 5560,
    },
    {
      videoId: 'RG_mcr2lrPY',
      videoViews: 2422,
      videoPerformance: null,
      videoDuration: 2678,
    },
    {
      videoId: 'zMNPdhTnWK4',
      videoViews: 52280,
      videoPerformance: null,
      videoDuration: 1170,
    },
    {
      videoId: 'XXbX7tBEG9A',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 2968,
    },
    {
      videoId: 'q9FVVW7rbEg',
      videoViews: 290,
      videoPerformance: null,
      videoDuration: 6605,
    },
    {
      videoId: 'AI7mZ47zqUQ',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1365,
    },
    {
      videoId: '_GVnU5rvWYc',
      videoViews: 4870,
      videoPerformance: null,
      videoDuration: 154,
    },
    {
      videoId: 'lhKc4Sj1T6E',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1230,
    },
    {
      videoId: 'MEkzBYi5O5k',
      videoViews: 3471,
      videoPerformance: null,
      videoDuration: 5202,
    },
    {
      videoId: 'iArg46pMGE4',
      videoViews: 81,
      videoPerformance: null,
      videoDuration: 543,
    },
    {
      videoId: 'ufFfK1gI8h0',
      videoViews: 529,
      videoPerformance: null,
      videoDuration: 350,
    },
    {
      videoId: 'SZH-l0J6yUo',
      videoViews: 498,
      videoPerformance: null,
      videoDuration: 782,
    },
    {
      videoId: 'TJB7InHObq0',
      videoViews: 713,
      videoPerformance: null,
      videoDuration: 523,
    },
    {
      videoId: '0UasSEIyVzA',
      videoViews: 4016,
      videoPerformance: null,
      videoDuration: 127,
    },
    {
      videoId: 'JXh9R78RRzQ',
      videoViews: 302,
      videoPerformance: null,
      videoDuration: 1001,
    },
    {
      videoId: 'Pw2VM1FFuyc',
      videoViews: 29,
      videoPerformance: null,
      videoDuration: 95,
    },
    {
      videoId: 'X7wfrBZjfvU',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 581,
    },
    {
      videoId: 'T5miJZyLcnE',
      videoViews: 426,
      videoPerformance: null,
      videoDuration: 767,
    },
    {
      videoId: 'eN0e4l63qyA',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1589,
    },
    {
      videoId: 'gvfC2QUGpys',
      videoViews: 334648,
      videoPerformance: null,
      videoDuration: 579,
    },
    {
      videoId: 'fUDBBtsIYl8',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 3231,
    },
    {
      videoId: 'fSZq18M-NlI',
      videoViews: 2206,
      videoPerformance: null,
      videoDuration: 43,
    },
    {
      videoId: '3DGfavnancc',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 746,
    },
    {
      videoId: 'MiUPeUk32M4',
      videoViews: 2209,
      videoPerformance: null,
      videoDuration: 158,
    },
    {
      videoId: 'KMkKRHf3380',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1116,
    },
    {
      videoId: 'sqluZosFASM',
      videoViews: 38,
      videoPerformance: null,
      videoDuration: 284,
    },
    {
      videoId: 'hrC1yU_4B28',
      videoViews: 459,
      videoPerformance: null,
      videoDuration: 3415,
    },
    {
      videoId: 'x9Js3ORqlMQ',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1342,
    },
    {
      videoId: 'm-gOjSZOtfA',
      videoViews: 388,
      videoPerformance: null,
      videoDuration: 405,
    },
    {
      videoId: 'B7y_TH8p6GI',
      videoViews: 314,
      videoPerformance: null,
      videoDuration: 178,
    },
    {
      videoId: '2m6sXANxDB4',
      videoViews: 488,
      videoPerformance: null,
      videoDuration: 318,
    },
    {
      videoId: 'UZwhktf2y5I',
      videoViews: 28,
      videoPerformance: null,
      videoDuration: 963,
    },
    {
      videoId: 'KX3gsvJZ2aU',
      videoViews: 0,
      videoPerformance: null,
      videoDuration: 1037,
    },
  ]);
