import { Module } from '@nestjs/common';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { RelatedWordsApiModule } from '@Apps/modules/related-word/related-words.module';
import { ChannelAnalysisModule } from '@Apps/modules/channel/infrastucture/entities/channel-analysis.module';

@Module({
  imports: [UserApiModule, RelatedWordsApiModule, ChannelAnalysisModule],
})
export class StandaloneApiModule {}
