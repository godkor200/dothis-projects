import { ITodayIssue } from '@Apps/modules/video/infrastructure/daos/video.res';

export class TodayIssueMapper {
  static toObject(caches: string[]): ITodayIssue[] {
    const result: ITodayIssue[] = [];

    for (let i = 0; i < caches.length; i += 2) {
      const cache = caches[i];
      const score = caches[i + 1];
      const [category, videoId, videoViews, videoPublished, videoTitle] =
        cache.split(':');

      result.push({
        category,
        videoId,
        videoViews: Number(videoViews),
        videoPublished: videoPublished,
        videoTitle,
      });
    }
    return result;
  }
}
