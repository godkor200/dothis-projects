import { Module } from '@nestjs/common';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [IgniteService, ConfigService],
  exports: [IgniteService],
})
export class IgniteModule {}
