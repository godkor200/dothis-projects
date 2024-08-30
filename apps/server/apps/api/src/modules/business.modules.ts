import { Module } from '@nestjs/common';
import { StandaloneApiModule } from '@Apps/modules/standalone.business.modules';
import { OpensearchDependentApiModule } from '@Apps/modules/opensearch-dependent.business.modules';
import { CacheConfigModule } from '@Apps/config/cache/cache.config.module';
@Module({
  imports: [
    StandaloneApiModule,
    OpensearchDependentApiModule,
    CacheConfigModule,
  ],
})
export class BusinessModule {}
