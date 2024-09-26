import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@Apps/modules/user/domain/user.entity';
import { IdBaseDateEntityAbstract } from '@Libs/commons';
import { RegisterChannelDto } from '@Apps/modules/channel/application/dtos/register-channel.dto';

@Entity('channel-analysis')
export class ChannelAnalysisEntity extends IdBaseDateEntityAbstract {
  @Column({ name: 'registered_channel_id', type: 'varchar', length: 255 })
  registeredChannelId: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.registeredChannels)
  @JoinColumn({ name: 'user_id' })
  user: User;

  static create(registerChannel: RegisterChannelDto) {
    const channelAnalysisEntity = new ChannelAnalysisEntity();
    channelAnalysisEntity.userId = registerChannel.userId;
    channelAnalysisEntity.registeredChannelId =
      registerChannel.registeredChannelId;

    channelAnalysisEntity.createdAt = new Date();

    return channelAnalysisEntity;
  }
}
