import { UserChannelDataModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';
import { GetUserChannelDataHttpController } from '@Apps/api/src/user-channel-data/v1/commands/get-user-channel-data/get-user-channel-data.http.controller';
import { UserChannelDataRepository } from '@Apps/api/src/user-channel-data/v1/db/user-channel-data.repository';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/api/src/user-channel-data/user-channel-data.di-token';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const httpControllers = [GetUserChannelDataHttpController];

const repositories: Provider[] = [
  {
    provide: USER_CHANNEL_DATA_REPOSITORY,
    useClass: UserChannelDataRepository,
  },
];
@Module({
  imports: [CqrsModule, UserChannelDataModule],
  controllers: [...httpControllers],
  providers: [...repositories],
})
export class UserChannelDataV1ApiModule {}
