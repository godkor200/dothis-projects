import { Inject } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';

export class OpenSearchService {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute() {
    try {
      return await this.opensearchClient.cat.indices({
        format: 'json', // 응답 형식을 JSON으로 지정합니다.
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
