import { Module, Provider } from '@nestjs/common';

import { OpensearchCoreModule } from '@Apps/common/opensearch/core.module';

const queryHandlers: Provider[] = [];
@Module({
  imports: [OpensearchCoreModule],
  providers: [...queryHandlers],
})
export class VideoHistoryApiModule {}
