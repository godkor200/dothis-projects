import { ApiResponse, Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
import { IIndicesServerResponse } from '@Apps/common/aws/interface/os.res.interface';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';

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
  async countDocuments(query: any): Promise<number> {
    try {
      const countRes = await this.client.count({
        index: query.index,
        body: { query: query.body.query },
      });
      return countRes.body.count;
    } catch (error) {
      throw error; // 오류를 다시 던져 호출한 쪽에서 처리할 수 있게 합니다.
    }
  }
  /**
   * 초기 검색을 수행하고, 검색 결과와 문서 개수를 반환합니다.
   * @param query
   * @param processDoc
   * @returns
   */
  async initialSearch<T>(
    query: any,
    processDoc: (doc: any) => T,
    useScroll?: boolean,
  ): Promise<{
    isComplete: boolean;
    result: T[];
    resp?: Record<string, any>;
  }> {
    const documentCount = await this.countDocuments(query);
    try {
      if (useScroll && documentCount > query.size) {
        query['scroll'] = '10s';
      }
      let resp = await this.client.search(query);
      let result: T[] = resp.body.hits.hits.map(processDoc);
      const totalLength: number = resp.body.hits.total.value;
      const hitLen = resp.body.hits.hits.length;
      const isComplete = totalLength >= hitLen && documentCount < query.size;
      if (isComplete) return { isComplete, result };

      return { isComplete, result, resp };
    } catch (e) {
      throw e;
    }
  }

  /**
   * scroll api 방식 풀스캔
   * @param query
   * @param processDoc
   */
  async fullScan<T>(
    query: any,
    processDoc: (doc: any) => T,
  ): Promise<T[] | ScrollApiError> {
    const initResult = await this.initialSearch(query, processDoc, true);

    const { isComplete, result } = initResult;
    if (isComplete) {
      return result;
    }
    let resp = initResult.resp;

    resp['scroll'] = '10s';
    try {
      while (resp.body.hits.hits.length) {
        resp = await this.client.scroll({
          scroll_id: resp.body._scroll_id,
          scroll: '10s',
        });

        result.push(...resp.body.hits.hits.map(processDoc));
      }
      return result;
    } catch (error) {
      if (error.meta.statusCode === 429) return new ScrollApiError(error);
      console.error('Scroll 작업 중 오류 발생:', error);
      return error;
    } finally {
      // Scroll 작업 완료 후에 clearScroll 호출
      await this.client.clear_scroll({ scroll_id: resp.body._scroll_id });
    }
  }

  /**
   * SearchAfterApi 방식의 풀스캔
   * @param query
   * @param processDoc
   */
  async fullScanBySearchAfter<T>(
    query: any,
    processDoc: (doc: any) => T,
  ): Promise<T[] | ScrollApiError> {
    const initResult = await this.initialSearch(query, processDoc);

    const { isComplete, result } = initResult;

    if (isComplete) {
      return result;
    }
    let resp = initResult.resp;

    try {
      while (resp.body.hits.hits.length) {
        resp = await this.client.search({
          ...query,
          body: {
            ...query.body,
            search_after:
              resp.body.hits.hits[resp.body.hits.hits.length - 1].sort,
          },
        });

        result.push(...resp.body.hits.hits.map(processDoc));
      }
      return result;
    } catch (error) {
      console.error('search_after 작업 중 오류 발생:', error);
      if (error.meta.statusCode === 429) return new ScrollApiError(error);
      return error;
    }
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
