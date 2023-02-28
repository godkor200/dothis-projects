import { GetDicSearchTermCommandHandler } from '@Apps/modules/channel/v1/commands/get-dic-search-term/get-dic-searth-term.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/channel')
export class GetDicSearchTermHttpController {
  constructor(
    private readonly getDicSearchTermCommandHandler: GetDicSearchTermCommandHandler,
  ) {}

  @Get()
  async handler() {
    return this.getDicSearchTermCommandHandler.execute();
  }
}
