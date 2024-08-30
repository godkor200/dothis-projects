import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GET_RANKING_RELATED_WORD_DI_TOKEN,
  KOREAN_AUTO_COMPLETE_DI_TOKEN,
  RANKING_V2_SERVICE_DI_TOKEN,
  RELWORDS_DI_TOKEN,
  SET_RANKING_RELATED_WORD_DI_TOKEN,
} from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { VIDEO_CACHE_MULTI_RELATE_WORDS_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { FindRelCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/find-rel.cache';
import { FindAutoCompleteHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.http.controller';
import { FindAutoCompleteQueryHandler } from '@Apps/modules/related-word/interfaces/http/queries/v2/find-auto-complete/find-auto-complete.query-handler';
import { RelatedWordsRepository } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository';
import { VideoMultiRelatedWordsCacheAdapter } from '@Apps/modules/video/infrastructure/adapters/cache/video-multi-related-words.cache.adapter';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';
import { FindRankingRelatedWordAdapter } from '@Apps/modules/related-word/infrastructure/adapters/find-ranking-related-word.adapter';
import { SetRankingRelatedWordAdapter } from '@Apps/modules/related-word/infrastructure/adapters/set-ranking-related-word.adapter';
import { KoreanAutocompleteCache } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache';
import { IncrementScoreHttpController } from '@Apps/modules/related-word/interfaces/http/queries/v2/increment-score/increment-score.http.controller';
import { IncrementScoreService } from '@Apps/modules/related-word/application/service/increment-score.service';
import { ConfigModule } from '@nestjs/config';

const queryHandler = [FindAutoCompleteQueryHandler];
const service = [IncrementScoreService];
const controllers = [
  FindAutoCompleteHttpController,
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
  imports: [CqrsModule, ConfigModule, RelatedWordsModule],
  controllers,
  providers: [...repositories, ...queryHandler, ...service, ...adapter],
})
export class RelatedWordsV2Module {}
