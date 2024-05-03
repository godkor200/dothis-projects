import { Module } from '@nestjs/common';
import { StandaloneApiModule } from '@Apps/modules/standalone.business.modules';
import { IgniteDependentApiModule } from '@Apps/modules/ignite-dependent.business.modules'; // 경로는 예시입니다.

@Module({
  imports: [StandaloneApiModule, IgniteDependentApiModule],
})
export class BusinessModule {}
