import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import aws from 'aws-sdk';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsOpensearchService {
  protected client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      ...AwsSigv4Signer({
        region: this.configService.get<string>('aws.region'),
        service: 'es',
        getCredentials: () => {
          //FIXME: 중복으로 해야하나?
          const awsCredentials = new aws.Credentials({
            accessKeyId: this.configService.get<string>('aws.credential.key'),
            secretAccessKey: this.configService.get<string>(
              'aws.credential.secret',
            ),
          });
          aws.config.update({
            region: this.configService.get<string>('aws.region'),
            credentials: awsCredentials,
          });
          return new Promise((resolve, reject) => {
            aws.config.getCredentials((err, credentials) => {
              if (err) {
                reject(err);
              } else {
                resolve(credentials);
              }
            });
          });
        },
      }),
      node: `https://search-dothis-js7jgo2actyuzihx7zz335k2nq.ap-northeast-2.es.amazonaws.com/`,
    });
  }
}
