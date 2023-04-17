import { AthenaClient } from '@aws-sdk/client-athena';
import { ConfigService } from '@nestjs/config';

export class AwsAthenaService {
  private readonly athenaClient: AthenaClient;

  constructor(private readonly configService: ConfigService) {
    this.athenaClient = new AthenaClient({
      credentials: {
        accessKeyId: this.configService.get<string>('aws.credential.key'),
        secretAccessKey: this.configService.get<string>(
          'aws.credential.secret',
        ),
      },
    });
  }
}
