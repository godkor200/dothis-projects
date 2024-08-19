import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoDataShortsEntity } from './video-data-shorts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoDataShortsEntity], 'onPromisesMysql'),
  ],
  exports: [TypeOrmModule],
})
export class VideoDataEntityModule {}
