import { Controller, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindRelRequestDto } from './find-rel.request.dto';

@Controller()
export class FindRelHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  execute(@Query() queryParams: FindRelRequestDto) {
    const res = this.queryBus.execute(queryParams);
  }
}
