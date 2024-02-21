import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/constants/rel-words.enum.di-token.constant';
import { FindRelCache } from '@Apps/modules/related-word/repository/cache/find-rel.cache';
import { FindRelQueryHandler } from '@Apps/modules/related-word/queries/v2/find-rel/find-rel.query-handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '@Apps/config/cache/config/cache.config';
import { FindAutoCompleteHttpController } from '@Apps/modules/related-word/queries/v2/find-auto-complete/find-auto-complete.http.controller';
import { FindAutoCompleteQueryHandler } from '@Apps/modules/related-word/queries/v2/find-auto-complete/find-auto-complete.query-handler';

const controllers = [FindAutoCompleteHttpController];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  FindRelQueryHandler,
  FindAutoCompleteQueryHandler,
];
@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService, 'DB_CONNECTION'],
      extraProviders: [
        {
          provide: 'DB_CONNECTION',
          useValue: 2,
        },
      ],
    }),
  ],
  controllers,
  providers: [...repositories],
})
export class RelWordsApiV2Modules {}
