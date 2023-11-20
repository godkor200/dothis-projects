import { Module, Provider } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '../../constants/rel-words.enum.di-token.constant';
import { RelatedWordsModule } from '@Apps/modules/rel-words/repository/entity/related_words.entity.module';
import { RelatedWordsRepository } from '../../repository/db/rel-words.repository';
import { FindRelHttpController as FindRelHttpV1Controller } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRelQueryHandler } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.query-handler';
import { UpdateAutoCompleteWordsHttpController } from '@Apps/modules/rel-words/command/v1/update-auto-complete-words/update-auto-complete-words.http.controller';
import { UpdateAutoCompleteWordsCommandHandler } from '@Apps/modules/rel-words/command/v1/update-auto-complete-words/update-auto-complete-words.command-handler';
import { FindRelCache } from '@Apps/modules/rel-words/repository/cache/find-rel.cache';
import { RankRelHttpController } from '@Apps/modules/rel-words/queries/v1/rank-rel/rank-rel.http.controller';
import { RankRelQueryHandler } from '@Apps/modules/rel-words/queries/v1/rank-rel/rank-rel.query-handler';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoQueryHandler } from '@Apps/modules/video/database/video.query-handler';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { FindSearchKeywordHttpController } from '@Apps/modules/rel-words/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { FindSearchKeywordQueryHandler } from '@Apps/modules/rel-words/queries/v1/find-search-keyword/find-search-keyword.query-handler';

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
];

const handler = [
  FindRelQueryHandler,
  UpdateAutoCompleteWordsCommandHandler,
  RankRelQueryHandler,
  FindSearchKeywordQueryHandler,
];
@Module({
  imports: [CqrsModule, RelatedWordsModule, AwsModule],
  controllers,
  providers: [...repositories, ...handler],
})
export class RelWordsApiV1Modules {}
