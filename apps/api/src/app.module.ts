import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { AuthApiModule } from '@Apps/modules/auth/AuthApi.module';
import { ChannelApiModule } from './modules/channel/channel-api.module';
import { UserChannelDataApiModule } from '@Apps/modules/user-channel-data/user-channel-data-api.module';
import { validationSchema } from '@Apps/config/validationsSchema';
import dbConfig from '@Apps/config/database/config/db.env';
import cacheConfig from '@Apps/config/cashe/config/cache.env';
import { TypeormModule } from '@Apps/config/database/database.module';
import { HeathApiController } from '@Apps/health.controller';
import { HealthService } from '@Apps/health.service';
import { CacheConfigModule } from '@Apps/config/cashe/cashe.config.module';

@Module({
  controllers: [HeathApiController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'development.env',
      // process.env.NODE_ENV === 'development'
      //   ? 'development.env'
      //   : 'production.env',
      load: [dbConfig, cacheConfig],
      validationSchema,
    }),
    TypeormModule,
    CacheConfigModule,
    //module
    UserApiModule,
    ChannelApiModule,
    AuthApiModule,
    UserChannelDataApiModule,
  ],
  providers: [HealthService],
})
export class AppModule {}
