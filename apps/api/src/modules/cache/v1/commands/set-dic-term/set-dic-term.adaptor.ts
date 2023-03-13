import { SetDicTermCommandOutput } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.command';

export interface SetDicTermAdaptor {
  setDicTerm: (options: string[]) => Promise<SetDicTermCommandOutput>;
}
