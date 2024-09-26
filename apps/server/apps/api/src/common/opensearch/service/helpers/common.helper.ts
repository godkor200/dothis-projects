// helper/opensearch.helper.ts

import { Client as OpensearchClient } from '@opensearch-project/opensearch';

interface IndexInfo {
  health: string;
  status: string;
  index: string;
  uuid: string;
  pri: string;
  rep: string;
  'docs.count': string;
  'docs.deleted': string;
  'store.size': string;
  'pri.store.size': string;
}

interface IndexInfoResult {
  index: string;
  storeSize: number;
  uuid: string;
}

export class OpenSearchCommonHelper {
  constructor(private readonly opensearchClient: OpensearchClient) {}

  // store.size를 숫자로 변환하는 유틸리티 함수
  private parseSize(size: string): number {
    const units = { gb: 1e9, mb: 1e6 }; // 단위 변환 비율
    const match = size.match(/([\d.]+)([a-z]+)/i);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2].toLowerCase();
      return value * (units[unit] || 1); // 단위에 따라 변환
    }
    return 0; // 매칭되지 않을 경우 기본값 반환
  }

  // 가장 큰 번호의 백킹 인덱스를 필터링하고 IndexInfoResult 형식으로 반환
  async findLargestBackingIndex(
    indexName: string,
  ): Promise<IndexInfoResult | null> {
    try {
      const indices = await this.opensearchClient.cat.indices({
        index: indexName,
        format: 'json',
      });

      const filteredIndices = indices.body
        .filter(
          (entry: IndexInfo) => this.parseSize(entry['store.size']) >= 3e9,
        ) // 최소 3 GiB
        .sort((a: IndexInfo, b: IndexInfo) => {
          const aIndex = parseInt(a.index.match(/-([0-9]+)$/)[1], 10);
          const bIndex = parseInt(b.index.match(/-([0-9]+)$/)[1], 10);
          return bIndex - aIndex;
        });

      if (filteredIndices.length > 0) {
        const largestIndex = filteredIndices[0];
        return {
          index: largestIndex.index,
          storeSize: this.parseSize(largestIndex['store.size']),
          uuid: largestIndex.uuid,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching backing index data:', error);
      throw error;
    }
  }
}
