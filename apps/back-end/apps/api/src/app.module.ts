import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@Apps/api/src/health/health.module';
import { UserApiModule } from '@Apps/api/src/user/UserApi.module';
import { AuthApiModule } from '@Apps/api/src/auth/AuthApi.module';

import { TypeOrmExModule } from '@Libs/commons/src/typeorm/type-orm-ext.module';
import { DailyViewsModule } from '@Libs/entity/src/domain/daily_views/DaliyViewsModule';
import { createDatabaseConnection } from '@Libs/entity/src/database.mysql';
import { UserQueryRepository } from '@Libs/entity/src/domain/user/UserQueryRepository';
import { ChannelApiModule } from './channel/ChannelApi.module';
import { validationSchema } from '@Libs/entity/src/config/validationsSchema';
import dbConfig from '@Libs/entity/src/config/db.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : 'production.env',
      load: [dbConfig],
      validationSchema,
    }),
    HealthModule,
    UserApiModule,
    ChannelApiModule,
    DailyViewsModule,
    AuthApiModule,
    new createDatabaseConnection(dbConfig()).set(),
    TypeOrmExModule.forCustomRepository([UserQueryRepository]),
  ],
})
export class AppModule {}
