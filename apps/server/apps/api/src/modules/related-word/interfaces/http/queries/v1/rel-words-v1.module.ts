import { Module, Provider } from '@nestjs/common';
import {
  RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE,
  RELWORDS_DI_TOKEN,
} from '../../../../rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import { FindRelHttpController as FindRelHttpV1Controller } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-rel/find-rel.query-handler';
import { UpdateAutoCompleteWordsHttpController } from '@Apps/modules/related-word/interfaces/http/command/v1/update-auto-complete-words/update-auto-complete-words.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/related-word/interfaces/http/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { FindRelCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/find-rel.cache';
import { GetRankingRelatedWordsHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/ranking-related-words/get-ranking-related-words.http.controller';
import { GetRankingRelatedWordsService } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindSearchKeywordHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { FindSearchKeywordQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-search-keyword/find-search-keyword.query-handler';
import { CHANNEL_HISTORY_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryServiceModule } from '@Apps/modules/channel-history/application/service/channel-history.service.module';
import { RankingRelatedWordAggregateService } from '@Apps/modules/related-word/application/service/ranking-related-word.aggregate.service';
import { ChannelHistoryBaseAdapter } from '@Apps/modules/channel-history/infrastructure/adapters/channel-history.base.adapter';
import { FindAutoCompleteHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.http.controller';
import { FindAutoCompleteQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.query-handler';
import { VideoHistoryMultipleAdapter } from '@Apps/modules/video/infrastructure/adapters/video.history-multiple.adapter';

const controllers = [
  FindRelHttpV1Controller,
  UpdateAutoCompleteWordsHttpController,
  GetRankingRelatedWordsHttpController,
  FindSearchKeywordHttpController,
  FindAutoCompleteHttpController,
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
    provide: CHANNEL_HISTORY_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryBaseAdapter,
  },
  {
    provide: RELATED_WORD_TOKEN_GET_VIDEO_HISTORY_MULTIPLE,
    useClass: VideoHistoryMultipleAdapter,
  },
  FindAutoCompleteQueryHandler,
  RankingRelatedWordAggregateService,
];

const handler = [
  FindRelQueryHandler,
  UpdateAutoCompleteWordsCommandHandler,
  GetRankingRelatedWordsService,
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
