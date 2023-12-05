import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

@Injectable()
export class AwsOpenSearchConnectionService {
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

  async fullScan<T>(query: any, processDoc: (doc: any) => T): Promise<T[]> {
    const startTime: number = Date.now(),
      firstQuery: any = query;
    let resp: any = await this.client.search(firstQuery);
    const totalLength: number = resp.body.hits.total.value;
    let oldScrollId: string = resp.body._scroll_id;
    let result: T[] = [];

    // 처음 출력된 결과 저장
    for (const doc of resp.body.hits.hits) {
      result.push(processDoc(doc));
    }

    // SCROLL API를 통해 나온 결과 저장
    while (resp.body.hits.hits.length) {
      resp = await this.client.scroll({
        scroll_id: oldScrollId,
        scroll: '10s',
      });
      oldScrollId = resp.body._scroll_id;

      for (const doc of resp.body.hits.hits) {
        result.push(processDoc(doc));
      }
    }

    console.log('길이가 맞나?', totalLength, result.length === totalLength);

    console.log('TOTAL TIME:', Date.now() - startTime, 'milliseconds.');
    console.log(
      '쿼리타입 , 함수타입',
      query,
      'TOTAL TIME:',
      (Date.now() - startTime) / 1000,
      'seconds.',
    );

    return result;
  }
}
