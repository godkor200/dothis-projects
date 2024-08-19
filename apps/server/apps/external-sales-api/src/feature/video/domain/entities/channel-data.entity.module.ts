import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelDataEntity } from './channel-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelDataEntity], 'onPromisesMysql')],
  exports: [TypeOrmModule],
})
export class ChannelDataEntityModule {}
