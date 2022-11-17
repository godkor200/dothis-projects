import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@Apps/api/src/health/health.module';
import { UserApiModule } from '@Apps/api/src/user/UserApi.module';
import { createDatabaseConnection } from '../../../libs/entity/src/config/database.mysql';
import { TypeOrmExModule } from 'libs/commons/typeorm/type-orm-ext.module';
import { UserQueryRepository } from '../../../libs/entity/src/domain/user/UserQueryRepository';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    UserApiModule,
    createDatabaseConnection(),
    TypeOrmExModule.forCustomRepository([UserQueryRepository]),
  ],
})
export class AppModule {}
