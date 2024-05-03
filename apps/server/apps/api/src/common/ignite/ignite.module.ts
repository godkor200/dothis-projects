import { Module } from '@nestjs/common';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
const common = [IgniteService];

@Module({
  providers: [IgniteService],
  exports: common,
})
export class IgniteModule {}
