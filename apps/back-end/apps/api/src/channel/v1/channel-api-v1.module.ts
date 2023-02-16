import { Module, Provider } from '@nestjs/common';
import { ChannelModule } from '@Apps/api/src/config/database/domain/channel/ChannelModule';
const repositories: Provider[] = [];
@Module({
  imports: [ChannelModule],
  controllers: [],
  providers: [...repositories],
})
export class ChannelApiV1Module {}
