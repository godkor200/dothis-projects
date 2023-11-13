import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

@Injectable()
export class AwsOpensearchConnetionService {
  protected client: Client;

  constructor(
    private configService: ConfigService,
    private awsCredentialsService: AwsCredentialsService,
  ) {
    this.awsCredentialsService.updateAwsConfig();
    this.client = new Client({
      ...AwsSigv4Signer({
        region: this.configService.get<string>('aws.region'),
        service: 'es',
        getCredentials: () => {
          return new Promise((resolve, reject) =>
            aws.config.getCredentials((err, credentials) =>
              err ? reject(err) : resolve(credentials),
            ),
          );
        },
      }),
      node: this.configService.get<string>('aws.OPENSEARCH_NODE'),
    });
  }

  async fullScan<T>(query: any): Promise<T[]> {
    const start_time: number = Date.now();
    const first_query: any = query;

    let resp: any = await this.client.search(first_query);
    const total_length: number = resp.body.hits.total.value;
    let old_scroll_id: string = resp.body._scroll_id;
    let result: any[] = [];

    // 처음 출력된 결과 저장
    for (const doc of resp.body.hits.hits) {
      result.push(doc._source);
    }

    // SCROLL API를 통해 나온 결과 저장
    while (resp.body.hits.hits.length) {
      resp = await this.client.scroll({
        scroll_id: old_scroll_id,
        scroll: '10s',
      });
      old_scroll_id = resp.body._scroll_id;

      for (const doc of resp.body.hits.hits) {
        result.push(doc._source);
      }
    }

    console.log('길이가 맞나?', total_length, result.length === total_length);

    console.log('TOTAL TIME:', Date.now() - start_time, 'milliseconds.');
    console.log(
      '쿼리타입 , 함수타입',
      query,
      'TOTAL TIME:',
      (Date.now() - start_time) / 1000,
      'seconds.',
    );

    return result;
  }
}
