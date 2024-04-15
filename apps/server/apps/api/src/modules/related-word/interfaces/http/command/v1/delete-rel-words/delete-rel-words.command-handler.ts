import { DeleteRelWordsCommandDto } from '@Apps/modules/related-word/application/dtos/delete-rel-words.dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { InternalServerErrorException } from '@Libs/commons/src/exceptions/exceptions';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { RelatedWordModel } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';

export type TDeleteRelWordsCommandHandlerRes = Result<
  RelatedWordModel,
  RelwordsNotFoundError | KeywordsNotFoundError | InternalServerErrorException
>;

@CommandHandler(DeleteRelWordsCommandDto)
export class DeleteRelWordsCommandHandler
  implements ICommandHandler<DeleteRelWordsCommandDto>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,
  ) {}

  async execute(
    command: DeleteRelWordsCommandDto,
  ): Promise<
    Result<
      IRes<void>,
      | RelwordsNotFoundError
      | KeywordsNotFoundError
      | InternalServerErrorException
    >
  > {
    try {
      const deleteRelWords = command.deleteRelWords;

      const findResult = await this.relWordsRepository.findOneById(command.id);

      if (!findResult) {
        return Err(new KeywordsNotFoundError());
      }

      const relWordsArray = findResult.relWords.split(',');
      const isExistWords = deleteRelWords.every((relword) =>
        relWordsArray.includes(relword),
      );
      if (!isExistWords) {
        return Err(new RelwordsNotFoundError());
      }

      const newRelWordsArray = relWordsArray.filter(
        (relWord) => !deleteRelWords.includes(relWord),
      );
      const deletedRelWordsString = newRelWordsArray.join(',');

      const res = await this.relWordsRepository.updateOne({
        id: command.id,
        relWords: deletedRelWordsString,
      });

      return Ok(res);
    } catch (e) {
      return Err(new InternalServerErrorException());
    }
  }
}
