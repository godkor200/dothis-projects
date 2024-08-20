import { Module, Provider } from '@nestjs/common';
import { PostReqChannelHttpController } from '@ExternalApps/feature/crawl-queue/channel/interfaces/http/post-req-channel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PostRequestChannelIdCommand } from '@ExternalApps/feature/crawl-queue/channel/application/commands/post-req-channel-id.command';
import { PostRequestChannelService } from '@ExternalApps/feature/crawl-queue/channel/application/service/post-req-channel.service';
import {
  POST_REQUEST_CHANNEL_SERVICE_TOKEN,
  REQUEST_CHANNEL_REPOSITORY_DI_TOKEN,
} from '@ExternalApps/feature/crawl-queue/channel/channel.di-token.constants';
import { RequestChannelsEntityModule } from '@ExternalApps/feature/crawl-queue/channel/domain/entities/request-channels.entity.module';
import { RequestChannelRepository } from '@ExternalApps/feature/crawl-queue/channel/domain/repositories/request-channel.repository';
import { PassportModule } from '@nestjs/passport';
import { AtStrategy } from '@Libs/oauth';
const controllers = [PostReqChannelHttpController];
const commands: Provider[] = [PostRequestChannelIdCommand];
const service: Provider[] = [
  {
    provide: POST_REQUEST_CHANNEL_SERVICE_TOKEN,
    useClass: PostRequestChannelService,
  },
];
const repository: Provider[] = [
  {
    provide: REQUEST_CHANNEL_REPOSITORY_DI_TOKEN,
    useClass: RequestChannelRepository,
  },
];
const strategies: Provider[] = [AtStrategy];

@Module({
  imports: [
    CqrsModule,
    RequestChannelsEntityModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers,
  providers: [...commands, ...service, ...repository, ...strategies],
})
export class ChannelModule {}
