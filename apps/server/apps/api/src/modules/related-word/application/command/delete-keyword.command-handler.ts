import { DeleteKeyWordCommandDto } from '@Apps/modules/related-word/application/dtos/delete-keyword.dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { IRes } from '@Libs/types';
import { RelatedWordModel } from '@dothis/dto';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

export type TDeleteKeyWordCommandHandlerRes = Result<
  RelatedWordModel,
  KeywordsNotFoundError | InternalServerErrorException
>;

@CommandHandler(DeleteKeyWordCommandDto)
export class DeleteKeyWordCommandHandler
  implements ICommandHandler<DeleteKeyWordCommandDto>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,
  ) {}

  async execute(
    command: DeleteKeyWordCommandDto,
  ): Promise<
    Result<IRes<void>, KeywordsNotFoundError | InternalServerErrorException>
  > {
    try {
      const deleteRes = await this.relWordsRepository.delete(command.id);

      if (!deleteRes) {
        return Err(new KeywordsNotFoundError());
      }

      return Ok({ success: true });
    } catch (e) {
      return Err(new InternalServerErrorException());
    }
  }
}
