import { Module } from '@nestjs/common';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';

@Module({
  providers: [KafkaConfigService],
  exports: [KafkaConfigService],
})
export class KafkaModule {}
