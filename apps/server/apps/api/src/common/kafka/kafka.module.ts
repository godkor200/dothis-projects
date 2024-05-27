import { Module } from '@nestjs/common';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';
import { ProducerService } from '@Apps/common/kafka/service/producer.service';

@Module({
  providers: [KafkaConfigService, ProducerService],
  exports: [KafkaConfigService, ProducerService],
})
export class KafkaModule {}
