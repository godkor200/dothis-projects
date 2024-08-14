import {
  GetRelatedVideoAndVideoHistoryPickChannelAverageViews,
  IRelatedVideoAnalyticsData,
  IVideoHistoryResult,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { VideosMultiRelatedWordsCacheType } from '@Apps/modules/video/domain/ports/video.cache.outbound.ports';

interface ICalculateWordStatsRes {
  // `word`: 분석 대상이 되는 연관 단어입니다.
  word: string;

  // `count`: 해당 단어가 포함된 동영상의 개수입니다. 즉, 동영상 제목이나 태그에 단어가 포함되어 있는 경우의 수를 나타냅니다.
  count: number;

  // `totalViews`: 해당 단어를 포함하는 동영상들의 조회수 총합입니다. 이는 단어의 인기 또는 관련 동영상들의 총 조회수를 나타냅니다.
  totalViews: number;

  // `relatedKeywordPerformance`: 연관 단어의 성능을 나타내는 지표입니다. 각 동영상의 조회수를 해당 채널의 평균 조회수로 나눈 값의 평균입니다.
  // 이 값은 단어가 얼마나 해당 채널 평균보다 높은 성과를 내는지를 보여줍니다.
  relatedKeywordPerformance: number;

  // `sortFigures`: 정렬에 사용될 수 있는 수치입니다. 이는 관련 키워드 성능과 평균 조회수를 결합한 값으로,
  // 높은 성능과 조회수를 가지는 단어를 상위에 배치하는 데 사용될 수 있습니다.
  sortFigures: number;
}

/**
 * 요약 정리:
 * 처음 출시 시:
 *
 * 성과(Performance)를 "기대조회수(Expected Views)"라는 용어로 사용되었습니다.
 * "기대조회수" = "성과"인 것으로 사용되었습니다.
 * 나중에 변경된 사항:
 *
 * 예측 조회수(Predicted Views)가 추가되면서 각 영상별로 평소보다 몇 배의 조회수를 얻었는지를 나타내는 수치가 필요해졌습니다.
 * 이로 인해 "성과"의 개념이 체계화되었습니다.
 * 성과 = 영상 조회수 / 평균 조회수
 * 키워드 성과 = (영상 조회수 / 평균 조회수)의 평균
 * 새로운 용어 정의:
 *
 * 기대조회수:
 * 유저의 평균 조회수(User's Average Views) * 키워드 성과(Keyword's Performance)
 * 연관어 정렬:
 * 성과(평균 키워드의 성과)에 경쟁강도(Relative Strength)를 곱한 수치
 * 그래서 "평균 조회수"가 아닌 "성과"를 기준으로 한다는 설명.
 * 구체적인 계산 방법:
 *
 * 키워드의 성과는 모든 해당 키워드 비디오의 각각의 성과를 평균 내어 계산합니다.
 * 기대조회수는 유저의 채널의 평균 조회수를 바탕으로 계산하고, 채널 평균 조회수가 없는 경우 기본적으로 1000을 사용합니다.
 * 경쟁강도(Competitive Intensity)를 고려한 연관어 순위는,
 * (평균 성과 * 전체 조회수 합계) / 비디오 개수로 계산됩니다.
 * 구체적인 구현
 * 성과:
 *
 * 성능(Performance) = 조회수(Views) / 채널의 평균 조회수(Channel's Average Views)
 * 키워드 성과:
 *
 * 키워드 성과(Keyword Average Performance) = 성과의 평균(Performance Average) = (조회수(Views) / 채널의 평균 조회수(Channel's Average Views)의 평균(mean))
 * 기대조회수:
 *
 * 기대조회수(Expected Views) = 유저의 평균 조회수(User's Average Views) * 키워드 성과(Keyword Average Performance)
 * 연관어 성과에 따른 정렬:
 *
 * 연관어 성과(Related Word Performance) = ((평균 성과(Performance Average) * 조회수 합계(Total Views)) / 비디오 개수(Number of Videos))
 */
export class RankingRelatedWordAggregateService {
  /**
   * 설명: 연관어 정렬의 필요한 계산식 계산 함수
   * 1.성과(videoPerformance):영상의 조회수 / 채널의 평균 조회수
   * 2.키워드 성과(relatedKeywordPerformance): 성과의 합 / 영상 수
   * 3.기대조회수: 내 채널의 평균 조회수 * 키워드 성과
   * 4.연관어 정렬(sortFigures): 키워드 성과 * 경쟁강도 = (성과의 평균 * 조회수 합계)/ 영상 수
   * @param words: 연관어 배열
   * @param data: 탐색어와 연관어와 관련된 동영상들에 관한 채널평균조회수, 비디오 조회수 데이터
   */
  static calculateWordStats(
    words: string[],
    data: IRelatedVideoAnalyticsData[],
  ): ICalculateWordStatsRes[] {
    return words.map((word) => {
      let count = 0;
      let totalViews = 0;
      let totalPerformance = 0;
      data.forEach((d) => {
        if (d.videoTitle?.includes(word) || d.videoTags?.includes(word)) {
          let videoPerformance = d.videoViews / d.channelAverageViews;
          count++;
          totalViews += d.videoViews;
          totalPerformance += videoPerformance;
        }
      });
      /**
       * 기본 구독자수 notion_ref: https://www.notion.so/dothis-world/7f1b6590d3754d66a842b16b5c8ec8f5?v=c8229aaf707549f2b5c962f2369f01ce&pvs=4
       */
      const videoPerformanceAvg = count > 0 ? totalPerformance / count : 0;
      const sortFigures = (videoPerformanceAvg * totalViews) / count;
      return {
        word,
        count,
        totalViews,
        relatedKeywordPerformance: totalPerformance / count,
        sortFigures: sortFigures > 0 ? sortFigures : 0,
      };
    });
  }
  /**
   * 동영상 데이터로부터 연관어 통계 계산
   * @param data: 동영상과 연관어 데이터가 매핑된 객체
   */
  static analyzeRelatedWordStatistics(
    data: Record<
      string,
      GetRelatedVideoAndVideoHistoryPickChannelAverageViews[]
    >,
  ): ICalculateWordStatsRes[] {
    return Object.entries(data).map(([word, videos]) => {
      let count = 0;
      let totalViews = 0;
      let totalPerformance = 0;

      videos.forEach((video) => {
        let videoPerformance = video.videoViews / video.channelAverageViews;
        count++;
        totalViews += video.videoViews;
        totalPerformance += videoPerformance;
      });

      const basicSubscribers = 1000;
      const videoPerformanceAvg = count > 0 ? totalPerformance / count : 0;
      const sortFigures = (videoPerformanceAvg * totalViews) / count;
      const expectedViews = videoPerformanceAvg * basicSubscribers;

      return {
        word,
        count,
        totalViews,
        relatedKeywordPerformance: videoPerformanceAvg,
        sortFigures: sortFigures > 0 ? sortFigures : 0,
        expectedViews: expectedViews > 0 ? expectedViews : 0,
      };
    });
  }

  /**
   * 설명: 연관어 정렬의 필요한 계산식 계산 함수
   * 1.성과(videoPerformance):영상의 조회수 / 채널의 평균 조회수
   * 2.키워드 성과(relatedKeywordPerformance): 성과의 합 / 영상 수
   * 3.기대조회수: 내 채널의 평균 조회수 * 키워드 성과
   * 4.연관어 정렬(sortFigures): 키워드 성과 * 경쟁강도 = (성과의 평균 * 조회수 합계)/ 영상 수
   *
   * 기대조회수 삭제 관련
   * 연관어 정렬은 그 키워드로 검색한 영상들의 평균 조회수로 계산해야하는거고
   * 기대조회수는 내(유저)가 올린 영상들의 평균 조회수로 계산해야하는거라
   * 채널이 없어서 null이 될 경우에 default를 1000으로 하자는거였고
   * 연관어 정렬은 그냥 avg(video_performance) / sum(video_views) / count
   * 이렇게 계산해야지 돼서 채널히스토리에 default값을 넣을 필요는 없어요!
   *
   * @param videoData: 비디오 토큰 데이터
   * @param stats: 탐색어와 연관어와 관련된 동영상들에 관한 채널평균조회수, 비디오 조회수 데이터
   */
  static calculateWordStatsOs(
    videoData: VideosMultiRelatedWordsCacheType,
    stats: IVideoHistoryResult[],
  ) {
    return Object.entries(videoData).map(([word, videos]) => {
      let count = 0;
      let totalViews = 0;
      let totalPerformance = 0;

      videos.forEach((video) => {
        const matchedStats = stats.find((s) => s.video_id === video.videoId);
        if (matchedStats) {
          const videoPerformance = matchedStats.channel_average_views
            ? matchedStats.video_views /
              (matchedStats.channel_average_views || 1)
            : matchedStats.video_performance; // 평균 조회수가 없는 경우 1로 나눔

          count++;
          totalViews += matchedStats.video_views;
          totalPerformance += videoPerformance;
        }
      });

      const videoPerformanceAvg = count > 0 ? totalPerformance / count : 0;
      const sortFigures = (videoPerformanceAvg * totalViews) / (count || 1);

      return {
        word,
        count,
        totalViews,
        relatedKeywordPerformance: videoPerformanceAvg,
        sortFigures: sortFigures > 0 ? sortFigures : 0,
      };
    });
  }
}
