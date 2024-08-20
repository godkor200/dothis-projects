import { RelWordsRankingRes } from '@Libs/types';

export class RelatedWordMapper {
  static toObject(caches: string[]): RelWordsRankingRes[] {
    const result: RelWordsRankingRes[] = [];

    for (let i = 0; i < caches.length; i += 2) {
      const cache = caches[i];
      const score = caches[i + 1];
      const [word, sortFigure] = cache.split(':');

      result.push({
        word,
        sortFigure: Number(sortFigure),
      });
    }

    return result;
  }
}
