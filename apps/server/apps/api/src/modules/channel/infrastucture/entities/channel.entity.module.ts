import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelEntity } from './channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEntity], 'onPromisesMysql')],
  exports: [TypeOrmModule],
})
export class ChannelEntityModule {}
