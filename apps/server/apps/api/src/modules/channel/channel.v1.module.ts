import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindInfluentialListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/find-influential-list/find-influential-list.http.controller';
import { FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { FindInfluentialListService } from '@Apps/modules/channel/application/service/find-influential-list.service';
import { FindInfluentialListQueryHandler } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
import { ChannelListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-channel-list.http.controller';
import { GetChannelListService } from '@Apps/modules/channel/application/service/get-channel-list.service';
import {
  AUTO_CHANNEL_NAME_DI_TOKEN,
  CHANNEL_DATA_DI_TOKEN,
  CHANNEL_DATA_LIST_DI_TOKEN,
  CHANNEL_INFO_ADAPTER_DI_TOKEN,
  CHANNEL_REGISTRATION,
  TIME_LINE_TOKEN_DI_TOKEN,
} from '@Apps/modules/channel/channel.di-token';
import {
  ChannelDataAdapter,
  ChannelSearchAdapter,
} from '@Apps/modules/channel/infrastucture/adapters';
import { GetChannelInfoAdapter } from '@Apps/modules/channel/infrastucture/adapters/get-channel-info.adapter';
import { GetAutoChannelNameAdapter } from '@Apps/modules/channel/infrastucture/adapters/get-auto-channel-name.adapter';
import { GetAutoCompleteChannelNameService } from '@Apps/modules/channel/application/service/get-auto-complete-channel-name.service';
import { ChannelAutoCompleteController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-auto-complete-channel-name.http.controller';
import { HttpModule } from '@nestjs/axios';
import { TimelineAdapter } from '@Apps/modules/channel/infrastucture/adapters/timeline.adapter';
import { VideoTimelineController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-timeline.http.controller';
import { GetTimelineService } from '@Apps/modules/channel/application/service/get-timeline.service';
import { VideoHistoryRecentByIdAdapter } from '@Apps/modules/video-history/infrastructure/adapters/video-history.recent-by-id.adapter';
import { VIDEO_HISTORY_RECENT_ID_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { RegisterChannelHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/post-channel-analysis.http.controller';
import { ChannelAnalysisRepository } from '@Apps/modules/channel/infrastucture/repositories/channel-analysis.repository';
import { ChannelAnalysisModule } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.module';
import { RegisterChannelService } from '@Apps/modules/channel/application/service/register-channel.service';
import { GetRegisteredChannelHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-registered-channel.http.controller';
import { GetRegisteredChannelService } from '@Apps/modules/channel/application/service/get-registered-channel.service';
import { GetRegisterChannelContentListHttpController } from '@Apps/modules/channel/interfaces/http/controllers/v1/get-registered-channel-content-list.http.controller';
import { GetRegisterContentListService } from '@Apps/modules/channel/application/service/get-register-content-list.service';
import { VideoListByChannelIdAdapter } from '@Apps/modules/video/infrastructure/adapters/video.list-by-channel-id.adapter';
import {
  VIDEO_DATA_ADAPTER_DI_TOKEN,
  VIDEO_LIST_BY_CHANNEL_ID_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoDataAdapter } from '@Apps/modules/video/infrastructure/adapters/video_data.adapter';

const controllers = [
  FindInfluentialListHttpController,
  ChannelListHttpController,
  ChannelAutoCompleteController,
  VideoTimelineController,
  RegisterChannelHttpController,
  GetRegisteredChannelHttpController,
  GetRegisterChannelContentListHttpController,
];

const service: Provider[] = [
  {
    provide: FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN,
    useClass: FindInfluentialListService,
  },
  GetChannelListService,
  GetAutoCompleteChannelNameService,
  GetTimelineService,
  RegisterChannelService,
  GetRegisteredChannelService,
  GetRegisterContentListService,
];

const adapter: Provider[] = [
  {
    provide: CHANNEL_DATA_LIST_DI_TOKEN,
    useClass: ChannelSearchAdapter,
  },
  {
    provide: CHANNEL_INFO_ADAPTER_DI_TOKEN,
    useClass: GetChannelInfoAdapter,
  },
  {
    provide: AUTO_CHANNEL_NAME_DI_TOKEN,
    useClass: GetAutoChannelNameAdapter,
  },
  {
    provide: TIME_LINE_TOKEN_DI_TOKEN,
    useClass: TimelineAdapter,
  },
  {
    provide: VIDEO_HISTORY_RECENT_ID_DI_TOKEN,
    useClass: VideoHistoryRecentByIdAdapter,
  },
  {
    provide: CHANNEL_REGISTRATION,
    useClass: ChannelAnalysisRepository,
  },
  {
    provide: CHANNEL_DATA_DI_TOKEN,
    useClass: ChannelDataAdapter,
  },
  {
    provide: VIDEO_LIST_BY_CHANNEL_ID_ADAPTER_DI_TOKEN,
    useClass: VideoListByChannelIdAdapter,
  },
  {
    provide: VIDEO_DATA_ADAPTER_DI_TOKEN,
    useClass: VideoDataAdapter,
  },
];

const queries: Provider[] = [FindInfluentialListQueryHandler];

@Module({
  imports: [CqrsModule, HttpModule, ChannelAnalysisModule],
  controllers,
  providers: [...service, ...adapter, ...queries],
})
export class ChannelApiV1Module {}
