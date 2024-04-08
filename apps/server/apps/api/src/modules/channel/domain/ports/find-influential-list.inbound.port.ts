import { TFindInfluentialListRes } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';

export interface FindInfluentialListInboundPort {
  execute(dto: FindInfluentialListDto): Promise<TFindInfluentialListRes>;
}
