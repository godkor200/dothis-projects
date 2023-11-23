import aws, { Credentials } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsCredentialsService {
  constructor(private configService: ConfigService) {}

  getAwsCredentials(): Credentials {
    const accessKeyId = this.configService.get<string>('aws.credential.key');
    const secretAccessKey = this.configService.get<string>(
      'aws.credential.secret',
    );

    return new aws.Credentials({
      accessKeyId,
      secretAccessKey,
    });
  }

  updateAwsConfig() {
    aws.config.update({
      region: this.configService.get<string>('aws.region'),
      credentials: this.getAwsCredentials(),
    });
  }
}
