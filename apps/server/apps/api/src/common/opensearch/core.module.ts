import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpensearchModule } from '@Apps/common/opensearch/opensearch.module';

@Module({
  imports: [
    OpensearchModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: [
          configService.get<string>('opensearch.opensearch_node_one'),
          configService.get<string>('opensearch.opensearch_node_two'),
          configService.get<string>('opensearch.opensearch_node_three'),
        ],
        auth: {
          username: configService.get<string>('opensearch.opensearch_id'),
          password: configService.get<string>('opensearch.opensearch_pw'),
        },
        ssl: {
          rejectUnauthorized: false, // SSL 인증서 검증 비활성화
        },
      }),
    }),
  ],
})
export class OpensearchCoreModule {}
