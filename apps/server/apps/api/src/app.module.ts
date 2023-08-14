import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from 'apps/api/src/config/validationsSchema';
import dbConfig from 'apps/api/src/config/database/config/db.env';
import cacheConfig from 'apps/api/src/config/cache/config/cache.env';
import appConfig from 'apps/api/src/config/app/config/app.env';
import awsConfig from '@Apps/config/aws/config/aws.env';
import { TypeormModule } from 'apps/api/src/config/database/database.module';

import { HeathApiController } from 'apps/api/src/health.controller';
import { HealthService } from 'apps/api/src/health.service';
import { ScheduleModule } from '@nestjs/schedule';

import { BusinessModules } from '@Apps/modules/modules';
import { CommonModule } from '@Apps/common/common.module';

@Module({
  controllers: [HeathApiController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? 'development.env'
          : 'production.env',
      load: [dbConfig, cacheConfig, appConfig, awsConfig],
      validationSchema,
    }),
    ScheduleModule.forRoot(),
    TypeormModule,
    CommonModule,
    //module
    BusinessModules,
  ],
  providers: [HealthService],
})
export class AppModule {}
