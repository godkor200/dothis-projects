import { Module } from '@nestjs/common';
import { AuthApiModule } from '@Apps/common/auth/AuthApi.module';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';

@Module({
  imports: [AuthApiModule, AwsModule],
  providers: [IgniteModule],
})
export class CommonModule {}
