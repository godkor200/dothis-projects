import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpensearchModule } from '@Apps/common/opensearch/opensearch.module';

@Module({
  imports: [
    OpensearchModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: configService.get<string>('aws.OPENSEARCH_NODE'),
      }),
    }),
  ],
})
export class OpensearchCoreModule {}
