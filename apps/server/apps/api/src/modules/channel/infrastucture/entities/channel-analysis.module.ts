import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@Apps/modules/user/domain/user.entity';
import { ChannelAnalysisEntity } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChannelAnalysisEntity], 'default')],
  exports: [TypeOrmModule],
})
export class ChannelAnalysisModule {}
