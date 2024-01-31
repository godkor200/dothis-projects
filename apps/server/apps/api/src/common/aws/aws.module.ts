import { Module } from '@nestjs/common';
import { AwsAthenaService } from './service/aws.athena.service';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
const common = [
  AwsAthenaService,
  AwsOpenSearchConnectionService,
  AwsCredentialsService,
];
@Module({
  providers: common,
  exports: common,
})
export class AwsModule {}
