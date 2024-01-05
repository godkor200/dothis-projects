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
    let resp = await this.client.search(query);
    let result: T[] = resp.body.hits.hits.map(processDoc);
    const totalLength: number = resp.body.hits.total.value;
    const hitLen = resp.body.hits.hits.length;
    const innerHitsLength = resp.body.hits.hits.reduce(
      (a, inner_hit) => a + inner_hit.inner_hits.video_list.hits.total.value,
      0,
    );
    /**
     *  실사용 디버깅용으로 한동한 콘솔 놔둘 계획 24년 1월 4일
     */
    console.log(
      '처음 출력된 결과가 전체의 데이터의 길이 인지:',
      totalLength >= hitLen,
      'while SCROLL API hitLen:',
      hitLen,
      '전체의 데이터:',
      totalLength,
      'innerHitsLength:',
      innerHitsLength,
    );
    if (totalLength >= hitLen) return result;
    try {
      while (resp.body.hits.hits.length) {
        resp = await this.client.scroll({
          scroll_id: resp.body._scroll_id,
          scroll: '10s',
        });

        result.push(...resp.body.hits.hits.map(processDoc));
      }
    } catch (error) {
      console.error('Scroll 작업 중 오류 발생:', error);
    } finally {
      // Scroll 작업 완료 후에 clearScroll 호출
      await this.client.clear_scroll({ scroll_id: resp.body._scroll_id });
    }
    console.log('여기로 갔니????');
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
