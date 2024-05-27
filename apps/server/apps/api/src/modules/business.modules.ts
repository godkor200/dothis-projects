import { Module } from '@nestjs/common';
import { StandaloneApiModule } from '@Apps/modules/standalone.business.modules';
import { IgniteDependentApiModule } from '@Apps/modules/ignite-dependent.business.modules';
@Module({
  imports: [StandaloneApiModule, IgniteDependentApiModule],
})
export class BusinessModule {}
