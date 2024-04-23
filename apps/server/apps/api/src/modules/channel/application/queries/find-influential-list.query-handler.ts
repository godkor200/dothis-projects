import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindInfluentialListDto } from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import { Result } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { Inject, NotFoundException } from '@nestjs/common';
import { FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN } from '@Apps/modules/channel/channel-data.di-token.constants';
import { FindInfluentialListInboundPort } from '@Apps/modules/channel/domain/ports/find-influential-list.inbound.port';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { TInfluentialChannelRes } from '@dothis/dto';
export type TFindInfluentialListRes = Result<
  IRes<TInfluentialChannelRes[]>,
  TableNotFoundException | NotFoundException
>;
@QueryHandler(FindInfluentialListDto)
export class FindInfluentialListQueryHandler
  implements IQueryHandler<FindInfluentialListDto, TFindInfluentialListRes>
{
  constructor(
    @Inject(FIND_INFLUENTIAL_LIST_SERVICE_DI_TOKEN)
    private readonly findInfluentialListService: FindInfluentialListInboundPort,
  ) {}

  async execute(dto: FindInfluentialListDto): Promise<TFindInfluentialListRes> {
    return await this.findInfluentialListService.execute(dto);
  }
}
