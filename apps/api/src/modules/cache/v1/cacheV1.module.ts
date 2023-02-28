import { Module, Provider } from '@nestjs/common';
import { FindDicTermHandler } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FindDicTermService } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.service';

const controllers = [FindDicTermHandler];

const providers: Provider[] = [FindDicTermService];
@Module({
  imports: [CqrsModule],
  controllers,
  providers,
})
export class CacheV1Module {}
