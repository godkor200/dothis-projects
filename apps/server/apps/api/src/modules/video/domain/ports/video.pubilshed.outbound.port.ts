import { VideoPublishedDao } from '@Apps/modules/video/infrastructure/daos/video.pubilshed.dao';
import { Result } from 'oxide.ts';
export type IVideoPubilshedOutboundResult = {
  key_as_string: string;
  key: number;
  doc_count: number;
};
export type IVideoPubilshedOutboundRes = Result<
  IVideoPubilshedOutboundResult[],
  any
>;

export interface VideoPubilshedOutboundPort {
  execute(dao: VideoPublishedDao): Promise<IVideoPubilshedOutboundRes>;
}
