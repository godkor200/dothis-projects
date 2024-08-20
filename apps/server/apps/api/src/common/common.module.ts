import { Module } from '@nestjs/common';
import { AuthApiModule } from '@Apps/common/auth/AuthApi.module';
import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';

@Module({
  imports: [AuthApiModule, OpensearchCoreModule],
})
export class CommonModule {}
