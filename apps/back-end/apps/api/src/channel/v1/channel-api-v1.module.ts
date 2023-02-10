import { Module, Provider } from '@nestjs/common';
import { ChannelModule } from '@Libs/entity/src/domain/channel/ChannelModule';
const repositories: Provider[] = [];
@Module({
  imports: [ChannelModule],
  controllers: [],
  providers: [...repositories],
})
export class ChannelApiV1Module {}
