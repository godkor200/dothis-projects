import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';

export interface IRankingRelWords {
  data: GetRelatedVideoAndVideoHistory[];
  relatedWord: string;
}
