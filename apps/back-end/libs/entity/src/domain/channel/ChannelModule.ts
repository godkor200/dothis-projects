import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './Channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  exports: [TypeOrmModule],
  providers: [],
})
export class ChannelModule {}
