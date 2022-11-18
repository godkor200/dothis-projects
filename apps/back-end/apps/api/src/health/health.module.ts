import { Module } from '@nestjs/common';
import { HealthService } from '@Apps/api/src/health/health.service';
import { HeathApiController } from '@Apps/api/src/health/health.controller';

@Module({
  imports: [],
  controllers: [HeathApiController],
  providers: [HealthService],
})
export class HealthModule {}
