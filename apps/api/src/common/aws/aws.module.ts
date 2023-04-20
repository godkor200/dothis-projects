import { Module } from '@nestjs/common';
import { AwsAthenaService } from './service/aws.athena.service';

@Module({
  providers: [AwsAthenaService],
})
export class AwsModule {}
