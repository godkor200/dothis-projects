import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PutAgreePromotionDto } from '@Apps/modules/user/dtos/put-agree-promotion.dtos';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';
import { Err, Ok } from 'oxide.ts';
import { ProducerService } from '@Apps/common/kafka/service/producer.service';

@CommandHandler(PutAgreePromotionDto)
export class PutAgreePromotionCommandHandler
  implements ICommandHandler<PutAgreePromotionDto>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,

    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ProducerService,
  ) {}
  async execute(command: PutAgreePromotionDto) {
    const res = await this.userRepository.updateOne({
      id: command.id.toString(),
      agreePromotion: command.isAgree,
    });
    if (!res.success) return Err(new InternalServerErrorException());
    await this.kafkaClient.produce({
      topic: 'channel_id',
      messages: [
        {
          value: JSON.stringify({
            channelId: command.channelId,
            userId: command.id,
          }),
        },
      ],
    });
    return Ok(res.success);
  }
}
