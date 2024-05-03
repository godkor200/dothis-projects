import { Module, Provider } from '@nestjs/common';

import { AwsModule } from '@Apps/common/aws/aws.module';

const queryHandlers: Provider[] = [];
@Module({
  imports: [AwsModule],
  providers: [...queryHandlers],
})
export class VideoHistoryApiModule {}
