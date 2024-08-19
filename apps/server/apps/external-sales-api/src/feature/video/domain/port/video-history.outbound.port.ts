import { VideoDataInsertData } from '@ExternalApps/feature/video/infrastructure/repositories/video-history.repository';

export interface VideoHistoryOutboundPort {
  insert(data: VideoDataInsertData): Promise<boolean>;
}
