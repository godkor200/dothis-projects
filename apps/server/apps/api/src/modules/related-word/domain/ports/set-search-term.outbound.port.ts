import { SetDicTermCommandOutput } from '@Apps/modules/related-word/application/dtos/set-dic-term.command';

export interface SetSearchTermOutboundPort {
  setDicTerm: (options: string[]) => Promise<SetDicTermCommandOutput>;
}
