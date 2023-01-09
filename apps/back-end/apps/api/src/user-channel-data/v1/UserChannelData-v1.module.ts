import { Module } from '@nestjs/common';
import { UserChannelDataService } from '../UserChannelDataApi.service';
import { UserChannelDataController } from './UserChannelData.controller';
import { UserChannelDataModule } from '@Libs/entity/src/domain/userChannelData/UserChannelDataModule';

@Module({
  imports: [UserChannelDataModule],
  controllers: [UserChannelDataController],
  providers: [UserChannelDataService],
})
export class UserChannelDataV1ApiModule {}
