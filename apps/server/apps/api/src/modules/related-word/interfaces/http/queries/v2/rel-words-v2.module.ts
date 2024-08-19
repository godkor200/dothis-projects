import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GET_RANKING_RELATED_WORD_DI_TOKEN,
  KOREAN_AUTO_COMPLETE_DI_TOKEN,
  RANKING_V2_SERVICE_DI_TOKEN,
  RELWORDS_DI_TOKEN,
  SET_RANKING_RELATED_WORD_DI_TOKEN,
} from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { FindRelCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/find-rel.cache';

import { ConfigModule } from '@nestjs/config';
import { FindAutoCompleteHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.http.controller';
import { FindAutoCompleteQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.query-handler';
import { RankingHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/ranking/ranking.http.controller';
import { GetRankingV2QueryHandler } from '@Apps/modules/related-word/application/queries/get-ranking.v2.query-handler';
import { GetRankingRelatedWordsV2Service } from '@Apps/modules/related-word/application/service/get-ranking-related-words.v2.service';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import {
  VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
  VIDEO_HISTORY_GET_LAST_ADAPTER_IGNITE_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { VideoMultiRelatedWordsCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video-multi-related-words.cache.adapter';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';
import { VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN } from '@Apps/modules/video-history/video_history.di-token';
import { VideoHistoryGetMultipleByIdV2Adapter } from '@Apps/modules/video-history/infrastructure/adapters/new/video-history.get-multiple-by-id.adapter';
import { CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN } from '@Apps/modules/channel-history/channel-history.di-token.constants';
import { ChannelHistoryByChannelIdAdapter } from '@Apps/modules/channel-history/infrastructure/adapters';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';
import { VideoHistoryGetLastOneByIdsAdapter } from '@Apps/modules/video-history/infrastructure/adapters/new/video-history.get-last-one-by-ids.adapter';
import { FindRankingRelatedWordAdapter } from '@Apps/modules/related-word/infrastructure/adapters/find-ranking-related-word.adapter';
import { SetRankingRelatedWordAdapter } from '@Apps/modules/related-word/infrastructure/adapters/set-ranking-related-word.adapter';
import { KoreanAutocompleteCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache';
import { IncrementScoreHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/increment-score/increment-score.http.controller';
import { IncrementScoreService } from '@Apps/modules/related-word/application/service/increment-score.service';

const queryHandler = [FindAutoCompleteQueryHandler, GetRankingV2QueryHandler];
const service = [
  {
    provide: RANKING_V2_SERVICE_DI_TOKEN,
    useClass: GetRankingRelatedWordsV2Service,
  },
  IncrementScoreService,
];
const controllers = [
  FindAutoCompleteHttpController,
  RankingHttpController,
  IncrementScoreHttpController,
];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE,
    useClass: RelatedWordsRepository,
  },
];
const adapter: Provider[] = [
  {
    provide: VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN,
    useClass: VideoMultiRelatedWordsCacheAdapter,
  },
  {
    provide: VIDEO_HISTORY_GET_LIST_ADAPTER_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetMultipleByIdV2Adapter,
  },
  {
    provide: CHANNEL_HISTORY_BY_CHANNEL_ID_IGNITE_DI_TOKEN,
    useClass: ChannelHistoryByChannelIdAdapter,
  },
  {
    provide: VIDEO_HISTORY_GET_LAST_ADAPTER_IGNITE_DI_TOKEN,
    useClass: VideoHistoryGetLastOneByIdsAdapter,
  },
  {
    provide: GET_RANKING_RELATED_WORD_DI_TOKEN,
    useClass: FindRankingRelatedWordAdapter,
  },
  {
    provide: SET_RANKING_RELATED_WORD_DI_TOKEN,
    useClass: SetRankingRelatedWordAdapter,
  },
  {
    provide: KOREAN_AUTO_COMPLETE_DI_TOKEN,
    useClass: KoreanAutocompleteCache,
  },
];
@Module({
  imports: [CqrsModule, IgniteModule, ConfigModule, RelatedWordsModule],
  controllers,
  providers: [...repositories, ...queryHandler, ...service, ...adapter],
})
export class RelWordsApiV2Modules {}
