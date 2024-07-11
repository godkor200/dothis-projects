import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestVideoEntity } from '@ExternalApps/feature/video/domain/entities/request-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestVideoEntity])],
  exports: [TypeOrmModule],
})
export class RequestVideoEntityModule {}
