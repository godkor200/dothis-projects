import { Module } from '@nestjs/common';
import { AuthApiModule } from '@Apps/common/auth/AuthApi.module';
import { AwsModule } from '@Apps/common/aws/aws.module';
import { IgniteModule } from '@Apps/common/ignite/ignite.module';
import { KafkaModule } from '@Apps/common/kafka/kafka.module';

@Module({
  imports: [AuthApiModule, AwsModule, KafkaModule],
  providers: [IgniteModule],
})
export class CommonModule {}
