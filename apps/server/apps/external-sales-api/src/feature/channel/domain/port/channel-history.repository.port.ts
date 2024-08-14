import { VideoDataInsertData } from '@ExternalApps/feature/channel/infrastructure/repositories/channel-history.repository';

export interface ChannelHistoryRepositoryPort {
  insert(data: VideoDataInsertData): Promise<boolean>;
}
