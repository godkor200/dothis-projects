import { GetRelatedVideoAndVideoHistory } from '@Apps/modules/video_history/domain/ports/video-history.outbound.port';

export interface IRankingRelWords {
  data: GetRelatedVideoAndVideoHistory[];
  relatedWord: string;
}
