import { Module } from '@nestjs/common';
import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
const common = [IgniteService];
@Module({
  imports: common,
  exports: common,
})
export class IgniteModule {}
