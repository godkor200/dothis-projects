import { GetTopVideoHistoryOutboundPort } from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok } from 'oxide.ts';
import { TIssueTodayRes } from '@Apps/modules/video/application/queries/v1/find-issue-today.query-handler';
import { GetTopVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/get-top-video-history.dao';
import { getOpensearchClientToken } from '@Apps/common/opensearch/opensearch.module';
import { Client as OpensearchClient } from '@opensearch-project/opensearch';

@Injectable()
export class GetTopVideoHistoryAdapter
  implements GetTopVideoHistoryOutboundPort
{
  constructor(
    @Inject(getOpensearchClientToken())
    private readonly opensearchClient: OpensearchClient,
  ) {}

  async execute(dao: GetTopVideoHistoryDao): Promise<TIssueTodayRes> {
    const { channelId } = dao;
    try {
      return Ok([]);
    } catch (error) {
      return Err(error);
    }
  }
}
