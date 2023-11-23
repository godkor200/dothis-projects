import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AthenaExpress } from 'athena-express';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
import aws from 'aws-sdk';
@Injectable()
export class AwsAthenaService<T> {
  protected athenaClient: AthenaExpress<T>;

  constructor(
    private configService: ConfigService,
    private awsCredentialsService: AwsCredentialsService,
  ) {
    this.awsCredentialsService.updateAwsConfig();
    this.athenaClient = new AthenaExpress({ aws });
  }
}
