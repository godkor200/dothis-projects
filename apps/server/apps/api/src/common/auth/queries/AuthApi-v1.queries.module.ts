import { GetOwnInfoHttpController } from '@Apps/common/auth/queries/v1/get-own-info/get-own-info.http.controller';
import { Module, Provider } from '@nestjs/common';
import { AtStrategy } from '@Libs/commons/src';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntityModule } from '@Apps/modules/user/domain/user.entity.module';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepository } from '@Apps/modules/user/database/user.repository';
import { GetOwnInfoQueryHandler } from '@Apps/common/auth/queries/v1/get-own-info/get-own-info.query-handler';

const strategies: Provider[] = [AtStrategy];

const httpControllers = [GetOwnInfoHttpController];

const queryHandlers: Provider[] = [GetOwnInfoQueryHandler];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
@Module({
  controllers: [...httpControllers],
  imports: [
    CqrsModule,
    UserEntityModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [...strategies, ...queryHandlers, ...repositories],
})
export class AuthApiV1QueriesModule {}
