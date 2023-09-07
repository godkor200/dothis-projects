import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UpdatePersonalTagDto } from '@Apps/modules/user/dtos/update-personal-tag.dto';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';

@CommandHandler(UpdatePersonalTagDto)
export class UpdatePersonalTagCommandHandler
  implements ICommandHandler<UpdatePersonalTagDto, boolean>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(command: UpdatePersonalTagDto): Promise<boolean> {
    const characterization = command.tag.join(',');
    const res = await this.userRepository.updateOne({
      id: command.id,
      personalizationTag: characterization,
    });
    return res.success;
  }
}
