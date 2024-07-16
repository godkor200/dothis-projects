import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestChannelsEntity } from '@ExternalApps/feature/crawl-queue/channel/domain/entities/request-channels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestChannelsEntity])],
  exports: [TypeOrmModule],
})
export class RequestChannelsEntityModule {}
