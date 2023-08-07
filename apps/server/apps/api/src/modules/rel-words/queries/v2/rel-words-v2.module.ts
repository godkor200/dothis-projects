import { Module, Provider } from '@nestjs/common';
import { FindRelHttpV2Controller } from '@Apps/modules/rel-words/queries/v2/find-rel/find-rel.http.controller';
import { CqrsModule } from '@nestjs/cqrs';

const controllers = [];
const repositories: Provider[] = [];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...repositories],
})
export class RelWordsApiV2Modules {}
