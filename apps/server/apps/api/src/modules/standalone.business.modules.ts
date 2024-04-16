import { Module } from '@nestjs/common';
import { UserApiModule } from '@Apps/modules/user/user.module';
import { RelatedWordsApiModule } from '@Apps/modules/related-word/related-words.module';

@Module({
  imports: [UserApiModule, RelatedWordsApiModule],
})
export class StandaloneApiModule {}
