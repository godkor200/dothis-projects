import { UserChannelDataModule } from '@Apps/config/database/domain/entities/userChannelData/userChannelDataModule';
import { UserChannelDataRepository } from '@Apps/modules/user-channel-data/v1/db/user-channel-data.repository';
import { USER_CHANNEL_DATA_REPOSITORY } from '@Apps/modules/user-channel-data/user-channel-data.di-token';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const httpControllers = [];

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
