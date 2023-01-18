import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '@Libs/entity/src/domain/user/UserModule';
import { SubscribeModule } from '@Libs/entity/src/domain/subscribe/SubscribeModule';
import { GetUserHttpController } from '@Apps/api/src/user/v1/commands/get-user/get-user.http.controller';
import { UserRepository } from './db/user.repository';
import { ConfigModule } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@Libs/entity/src/domain/user/User.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { UserChannelDataModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';
import { USER_REPOSITORY } from '@Apps/api/src/user/user.di-token';
import { GetUserQueryHandler } from '@Apps/api/src/user/v1/commands/get-user/get-user.service';
import { GetChannelDataHttpController } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.http.controller';

const httpControllers = [GetUserHttpController, GetChannelDataHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

const commandHandlers: Provider[] = [GetUserQueryHandler];

@Module({
  imports: [
    CqrsModule,
    UserModule,
    SubscribeModule,
    UserChannelDataModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Subscribe, UserChannelData]),
  ],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers],
})
export class UserApiV1Module {}
