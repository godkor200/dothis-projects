import { Module } from '@nestjs/common';
import { AuthApiModule } from '@Apps/common/auth/AuthApi.module';
import { AwsModule } from '@Apps/common/aws/aws.module';

@Module({
  imports: [AuthApiModule, AwsModule],
})
export class CommonModule {}
