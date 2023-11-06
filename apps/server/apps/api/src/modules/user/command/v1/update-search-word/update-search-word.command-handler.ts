import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSearchWordDto } from '@Apps/modules/user/dtos/update-search-word.dto';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@Apps/modules/user/user.di-token';
import { UserRepositoryPort } from '@Apps/modules/user/database/user.repository.port';

@CommandHandler(UpdateSearchWordDto)
export class UpdateSearchWordCommandHandler
  implements ICommandHandler<UpdateSearchWordDto, boolean>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async execute(command: UpdateSearchWordDto): Promise<boolean> {
    const characterization = command.searchWord.join(',');
    const res = await this.userRepository.updateOne({
      id: command.id,
      searchWord: characterization,
    });
    return res.success;
  }
}
