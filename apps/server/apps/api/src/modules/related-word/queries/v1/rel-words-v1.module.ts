import { Module, Provider } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '../../constants/rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/related-word/repository/entity/related_words.entity.module';
import { RelatedWordsRepository } from '../../repository/db/rel-words.repository';
import { FindRelHttpController as FindRelHttpV1Controller } from '@Apps/modules/related-word/queries/v1/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from '@Apps/modules/related-word/queries/v1/find-rel/find-rel.query-handler';
import { UpdateAutoCompleteWordsHttpController } from '@Apps/modules/related-word/command/v1/update-auto-complete-words/update-auto-complete-words.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/related-word/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { FindRelCache } from '@Apps/modules/related-word/repository/cache/find-rel.cache';
import { RankRelHttpController } from '@Apps/modules/related-word/queries/v1/rank-rel/rank-rel.http.controller';
import { RankRelQueryHandler } from '@Apps/modules/related-word/queries/v1/rank-rel/rank-rel.query-handler';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/infrastructure/adapters/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindSearchKeywordHttpController } from '@Apps/modules/related-word/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { FindSearchKeywordQueryHandler } from '@Apps/modules/related-word/queries/v1/find-search-keyword/find-search-keyword.query-handler';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/channel-history.di-token.constants';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel_history/application/service/channel-history.service.module';
import { RankRelAggregateService } from '@Apps/modules/related-word/service/rank-rel.aggregate.service';

const controllers = [
  FindRelHttpV1Controller,
  UpdateAutoCompleteWordsHttpController,
  RankRelHttpController,
  FindSearchKeywordHttpController,
];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  {
    provide: VIDEO_OS_DI_TOKEN,
    useClass: VideoQueryHandler,
  },
  RankRelAggregateService,
];

const handler = [
  FindRelQueryHandler,
  UpdateAutoCompleteWordsCommandHandler,
  RankRelQueryHandler,
  FindSearchKeywordQueryHandler,
];
@Module({
  imports: [
    CqrsModule,
    AwsModule,
    RelatedWordsModule,
    ChannelHistoryServiceModule,
  ],
  controllers,
  providers: [...repositories, ...handler],
})
export class RelWordsApiV1Modules {}
