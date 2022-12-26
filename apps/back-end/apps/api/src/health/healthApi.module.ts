import { Module } from '@nestjs/common';
import { HealthService } from './v1/health.service';
import { HeathApiController } from './v1/health.controller';
@Module({
  imports: [],
  controllers: [HeathApiController],
  providers: [HealthService],
})
export class HealthApiModule {}
