import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AthenaExpress } from 'athena-express';
import aws from 'aws-sdk';
@Injectable()
export class AwsAthenaService<T> {
  protected athenaClient: AthenaExpress<T>;

  constructor(private configService: ConfigService) {
    const awsCredentials = new aws.Credentials({
      accessKeyId: this.configService.get<string>('aws.credential.key'),
      secretAccessKey: this.configService.get<string>('aws.credential.secret'),
    });
    aws.config.update({
      region: this.configService.get<string>('aws.region'),
      credentials: awsCredentials,
    });
    this.athenaClient = new AthenaExpress({ aws });
  }
}
