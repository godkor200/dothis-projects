import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthApiModule } from '@Apps/api/src/health/healthApi.module';
import { UserApiModule } from '@Apps/api/src/user/UserApi.module';
import { AuthApiModule } from '@Apps/api/src/auth/AuthApi.module';
import { ChannelApiModule } from './channel/ChannelApi.module';
import { UserChannelDataApiModule } from '@Apps/api/src/user-channel-data/UserChannelDataApi.module';
import { TypeOrmExModule } from '@Libs/commons/src/typeorm/type-orm-ext.module';
import { validationSchema } from '@Libs/entity/src/config/validationsSchema';
import dbConfig from '@Libs/entity/src/config/db.env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDatabaseConnection } from '@Libs/entity/src/database.mysql';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : 'production.env',
      load: [dbConfig],
      validationSchema,
    }),

    TypeOrmModule.forRoot(
      new CreateDatabaseConnection(dbConfig()).getTypeOrmConfig(),
    ),

    TypeOrmExModule.forCustomRepository([]),
    //module
    HealthApiModule,
    UserApiModule,
    ChannelApiModule,
    AuthApiModule,
    UserChannelDataApiModule,
  ],
})
export class AppModule {}
