import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserApiModule } from 'apps/api/src/modules/user/user.module';
import { AuthApiModule } from 'apps/api/src/modules/auth/AuthApi.module';
import { ChannelApiModule } from './modules/channel/channel-api.module';
import { validationSchema } from 'apps/api/src/config/validationsSchema';
import dbConfig from 'apps/api/src/config/database/config/db.env';
import cacheConfig from 'apps/api/src/config/cache/config/cache.env';
import appConfig from 'apps/api/src/config/app/config/app.env';
import awsConfig from '@Apps/config/aws/config/aws.env';

import { TypeormModule } from 'apps/api/src/config/database/database.module';
import { HeathApiController } from 'apps/api/src/health.controller';
import { HealthService } from 'apps/api/src/health.service';
import { CacheConfigModule } from 'apps/api/src/config/cache/cache.config.module';
import { CacheApiModule } from 'apps/api/src/modules/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RelWordsApiModules } from './modules/rel-words/rel-words.module';
import { DailyViewsApiModule } from './modules/daily_views/daily-views-api.module';

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
    CacheConfigModule,
    //module
    UserApiModule,
    ChannelApiModule,
    AuthApiModule,
    CacheApiModule,
    RelWordsApiModules,
    DailyViewsApiModule,
  ],
  providers: [HealthService],
})
export class AppModule {}
