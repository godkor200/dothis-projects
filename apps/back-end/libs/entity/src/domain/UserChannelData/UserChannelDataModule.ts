import { Module } from '@nestjs/common';
import { UserChannelData } from './UserChannelData.entity';

@Module({
  imports: [UserChannelData],
})
export class UserChannelDataModule {}
