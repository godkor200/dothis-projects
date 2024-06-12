import { TRankRes } from '@dothis/dto';

export interface SetRankingRelatedWordOutbound {
  execute(dao: TRankRes): Promise<void>;
}
