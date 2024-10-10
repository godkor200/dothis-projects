import { RepositoryPort } from '@Libs/commons';
import { ChannelAnalysisEntity } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.entity';

export interface ChannelAnalysisRepositoryPort
  extends RepositoryPort<ChannelAnalysisEntity> {
  findByUserId(userId: number): Promise<ChannelAnalysisEntity[]>;

  checkChannel(
    userId: number,
    channelId: string,
  ): Promise<ChannelAnalysisEntity[]>;
}
