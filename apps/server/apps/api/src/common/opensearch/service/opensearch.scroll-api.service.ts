import { Client as OpensearchClient } from '@opensearch-project/opensearch';
import { Inject, Injectable } from '@nestjs/common';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';

@Injectable()
export class ScrollService {
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async fetchAllDocuments(
    index: string,
    query: object,
    sourceFields: string[],
    scrollTime: string = '1m',
    pageSize: number = 10000,
  ) {
    try {
      // Initial scroll search
      let response = await this.opensearchClient.search({
        index,
        scroll: scrollTime,
        body: {
          query,
        },
        _source: sourceFields,
        size: pageSize,
      });

      let allDocuments = response.body.hits.hits.map((hit) => hit._source);

      // Continue scrolling until no more documents
      while (response.body.hits.hits.length > 0) {
        response = await this.opensearchClient.scroll({
          scroll_id: response.body._scroll_id,
          scroll: scrollTime,
        });

        allDocuments = allDocuments.concat(
          response.body.hits.hits.map((hit) => hit._source),
        );
      }

      // Clear the scroll context after use
      await this.opensearchClient.clearScroll({
        scroll_id: response.body._scroll_id,
      });

      return allDocuments;
    } catch (error) {
      console.error('Error in scroll operation:', error);
      throw error;
    }
  }
}
