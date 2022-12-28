import { Module } from '@nestjs/common';
import { UserChannelDataService } from './user-channel-data.service';
import { UserChannelDataController } from './v1/user-channel-data.controller';

@Module({
  controllers: [UserChannelDataController],
  providers: [UserChannelDataService],
})
export class UserChannelDataModule {}
