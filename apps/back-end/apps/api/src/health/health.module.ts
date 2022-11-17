import { Module } from '@nestjs/common';
import { HeathApiController } from '@Apps/api/src/health/health.controller';
import { HealthService } from '@Apps/api/src/health/health.service';

@Module({
  imports: [],
  controllers: [HeathApiController],
  providers: [HealthService],
})
export class HealthModule {}
