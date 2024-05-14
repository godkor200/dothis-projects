import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService {
  constructor(private configService: ConfigService) {}

  getKafkaOptions(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get<string>('KAFKA_CLIENT_ID'),
          brokers: [
            this.configService.get<string>('KAFKA_ENDPOINT1'),
            this.configService.get<string>('KAFKA_ENDPOINT2'),
            this.configService.get<string>('KAFKA_ENDPOINT3'),
          ],
        },
        consumer: {
          groupId: this.configService.get<string>('KAFKA_GROUP_ID'),
        },
      },
    };
  }
}
