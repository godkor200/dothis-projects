import { ApiResponse, Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
import { IIndicesServerResponse } from '@Apps/common/aws/interface/os.res.interface';

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

    try {
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
    } catch (error) {
      console.error('Scroll 작업 중 오류 발생:', error);
    } finally {
      // Scroll 작업 완료 후에 clearScroll 호출
      await this.client.clear_scroll({ scroll_id: oldScrollId });
    }
    return result;
  }
  async getIndices(alias: string) {
    try {
      const res: ApiResponse<IIndicesServerResponse<{ index: string }>> =
        await this.client.cat.indices({
          index: alias,
          format: 'json',
          h: 'index',
          s: 'index:desc',
        });

      return res.body;
    } catch (e) {
      console.error('getIndices  오류 발생:', e);
    }
  }
}
