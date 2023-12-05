import { Module } from '@nestjs/common';
import { AwsAthenaService } from './service/aws.athena.service';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

@Module({
  providers: [
    AwsAthenaService,
    AwsOpenSearchConnectionService,
    AwsCredentialsService,
  ],
  exports: [
    AwsAthenaService,
    AwsOpenSearchConnectionService,
    AwsCredentialsService,
  ],
})
export class AwsModule {}
