import { Module } from '@nestjs/common';
import { AwsAthenaService } from './service/aws.athena.service';
import { AwsOpensearchService } from '@Apps/common/aws/service/aws.opensearch.service';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

@Module({
  providers: [AwsAthenaService, AwsOpensearchService, AwsCredentialsService],
  exports: [AwsAthenaService, AwsOpensearchService, AwsCredentialsService],
})
export class AwsModule {}
