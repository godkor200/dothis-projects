import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RelatedWordsModule } from '@Apps/modules/related-word/infrastructure/repositories/entity/related_words.entity.module';

const controllers = [];
const queryHandlers: Provider[] = [];
const service: Provider[] = [];
const adapters: Provider[] = [];
@Module({
  imports: [CqrsModule, RelatedWordsModule],
  controllers,
  providers: [...service, ...queryHandlers, ...adapters],
})
export class VideoApiV2Module {}
