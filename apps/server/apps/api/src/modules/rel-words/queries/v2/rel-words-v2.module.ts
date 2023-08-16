import { Module, Provider } from '@nestjs/common';
import { FindRelHttpV2Controller } from '@Apps/modules/rel-words/queries/v2/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { FindRelCache } from '@Apps/modules/rel-words/repository/cache/find-rel.cache';
import { FindRelQueryHandler } from '@Apps/modules/rel-words/queries/v2/find-rel/find-rel.query-handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '@Apps/config/cache/config/cache.config';

const controllers = [FindRelHttpV2Controller];
const repositories: Provider[] = [
  {
    provide: RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE,
    useClass: FindRelCache,
  },
  FindRelQueryHandler,
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
