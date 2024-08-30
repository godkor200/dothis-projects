import { Result } from 'oxide.ts';

export type VideoHistoryDataStreamResult = Result<string, any>;

export interface VideoHistoryDataStreamOutbound {
  execute(): Promise<VideoHistoryDataStreamResult>;
}
