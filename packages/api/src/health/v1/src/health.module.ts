import { Module, forwardRef } from '@nestjs/common';
import { HealthService } from './health.service';
import { HeathApiController } from './health.controller';
import { AppModule } from 'back-end/apps/api/src/app.module';
@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [HeathApiController],
  providers: [HealthService],
})
export class HealthModule {}
