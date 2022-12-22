import { Module } from '@nestjs/common';
import { HealthService } from '@Apps/api/src/health/health.service';
import { HeathApiController } from '@dothis/libs/src/health/v1/src/';

@Module({
  imports: [],
  controllers: [HeathApiController],
  providers: [HealthService],
})
export class HealthModule {}
