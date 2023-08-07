import { Module } from '@nestjs/common';
import { AwsAthenaService } from './service/aws.athena.service';
import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

@Module({
  providers: [
    AwsAthenaService,
    AwsOpensearchConnetionService,
    AwsCredentialsService,
  ],
  exports: [
    AwsAthenaService,
    AwsOpensearchConnetionService,
    AwsCredentialsService,
  ],
})
export class AwsModule {}
