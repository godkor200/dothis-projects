import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';
import { GetVideoMultiKeywordCacheDao } from '@Apps/modules/video/infrastructure/daos/video.dao';

export class TodayIssueMapper {
  static toObject(caches: string[]): ITodayIssue[] {
    const result: ITodayIssue[] = [];

    for (let i = 0; i < caches.length; i += 2) {
      const cache = caches[i];
      const score = caches[i + 1];

      // 전체 데이터 분리
      const splitCache = cache.split(':');
      console.log(splitCache);

      // 첫 3개 및 마지막 부분 고정
      const search = splitCache[0];
      const related = splitCache[1];
      const videoId = splitCache[2];
      const videoViews = splitCache[3];

      // videoPublished 마지막 구분자까지 포함
      const videoPublished = splitCache[4]
        ? `${splitCache[4]}:${splitCache[5]}:${splitCache[6]}`
        : null;

      // 나머지를 합쳐 videoTitle로
      const channelName = splitCache[7];
      const videoTitle = splitCache[8];
      result.push({
        search,
        related,
        videoId,
        videoViews: Number(videoViews),
        videoPublished: videoPublished,
        videoTitle: videoTitle,
        channelName,
      });
    }
    return result;
  }
  static mergeResults(
    multiKeywordCacheRes: GetVideoMultiKeywordCacheDao[],
    historyGetTopViewsUnwrap: ITodayIssue[],
  ): ITodayIssue[] {
    const result: ITodayIssue[] = [];

    // search를 기준으로 빠르게 접근할 수 있도록 매핑
    const multiKeywordMap = new Map();
    multiKeywordCacheRes.forEach((item) => {
      multiKeywordMap.set(item.search, item.related);
    });

    // videoHistoryGetTopViewsUnwrap를 미리 처리
    const topViewsMap = new Map();
    historyGetTopViewsUnwrap.forEach((item) => {
      topViewsMap.set(item.search, item);
    });

    // GetVideoMultiKeywordCacheDao 배열 처리
    multiKeywordCacheRes.forEach(({ search, related }) => {
      if (topViewsMap.has(search)) {
        // search가 있는 경우 관련된 항목에 related를 추가
        const existingItem = topViewsMap.get(search);
        result.push({ ...existingItem, related });
      } else {
        // 없는 경우 새로운 객체를 생성
        result.push({
          search,
          related,
          videoId: null,
          videoTitle: null,
          videoViews: null,
          channelName: null,
          videoPublished: null,
        });
      }
    });

    // 이미 처리된 search들을 제외한 나머지 historyGetTopViewsUnwrap 추가
    historyGetTopViewsUnwrap.forEach((item) => {
      if (!multiKeywordMap.has(item.search)) {
        result.push(item); // 이미 related가 없는 경우니까 그대로 사용
      }
    });

    return result;
  }
}
