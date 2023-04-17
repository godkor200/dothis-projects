import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { AuthApiModule } from '@Apps/modules/auth/AuthApi.module';
import { ChannelApiModule } from './modules/channel/channel-api.module';
import { validationSchema } from '@Apps/config/validationsSchema';
import dbConfig from '@Apps/config/database/config/db.env';
import cacheConfig from '@Apps/config/cache/config/cache.env';
import appConfig from '@Apps/config/app/config/app.env';
import awsConfig from '@Apps/config/aws/aws.env';

import { TypeormModule } from '@Apps/config/database/database.module';
import { HeathApiController } from '@Apps/health.controller';
import { HealthService } from '@Apps/health.service';
import { CacheConfigModule } from '@Apps/config/cache/cache.config.module';
import { CacheApiModule } from '@Apps/modules/cache/cache.module';
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
