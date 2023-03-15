import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { C_channelEntity } from './c_channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([C_channelEntity])],
  exports: [TypeOrmModule],
  providers: [],
})
export class C_ChannelEntityModule {}
