import {
  IGetOneVideoHistoryOutboundPort,
  TGetVideoHistoryRes,
} from '@Apps/modules/video-history/domain/ports/video-history.outbound.port';
import { IGetVideoHistoryDao } from '@Apps/modules/video-history/infrastructure/daos/video-history.dao';

export class MockVideoHistory implements IGetOneVideoHistoryOutboundPort {
  async execute(dao: IGetVideoHistoryDao): Promise<TGetVideoHistoryRes> {}
}
