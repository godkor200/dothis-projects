import { Module } from '@nestjs/common';
import { StandaloneApiModule } from '@Apps/modules/standalone.business.modules';
import { IgniteDependentApiModule } from '@Apps/modules/ignite-dependent.business.modules';
import { CacheConfigModule } from '@Apps/config/cache/cache.config.module';
@Module({
  imports: [StandaloneApiModule, IgniteDependentApiModule, CacheConfigModule],
})
export class BusinessModule {}
