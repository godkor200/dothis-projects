import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord, Partitioners } from 'kafkajs';
import { KafkaConfigService } from '@Apps/common/kafka/service/kafka.service';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private kafkaConfigService: KafkaConfigService) {}

  private readonly kafka = new Kafka({
    brokers: this.kafkaConfigService.getKafkaOptions().options.client.brokers,
  });
  private readonly producer: Producer = this.kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    // Record (레코드):
    await this.producer.send(record); // 레코드는 Kafka 메시지의 단위로, Producer가 생성하고 Consumer가 소비하는 메시지를 나타냅니다.
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
