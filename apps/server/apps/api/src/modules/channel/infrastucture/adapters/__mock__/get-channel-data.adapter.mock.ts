import { ChannelDataRepositoryPort } from '@Apps/modules/channel/domain/ports/channel-data.repository.port';
import { ChannelData } from '@ExternalApps/feature/preview/application/dto/preview.response.type';

export class MockGetChannelDataAdapter implements ChannelDataRepositoryPort {
  async findOneByChannelId(channelId: string): Promise<ChannelData> {}
}
