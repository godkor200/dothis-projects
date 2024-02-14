import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardReferenceDto } from 'apps/api/src/modules/story-board/application/dtos';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { REFERENCE_DI_TOKEN_CONSTANT } from '@Apps/modules/story-board/reference.di-token.constant';
import { ReferenceOutboundPort } from '@Apps/modules/story-board/domain/ports/outbound/reference.outbound';
import { ReferNotExistsError } from '@Apps/modules/story-board/domain/errors';
import { ReferenceEntity } from '@Apps/modules/story-board/domain/entities/reference.entity';

@CommandHandler(PostStoryBoardReferenceDto)
export class PostReferenceCommand
  implements
    ICommandHandler<
      PostStoryBoardReferenceDto,
      Result<boolean, ReferNotExistsError | InternalServerErrorException>
    >
{
  constructor(
    @Inject(REFERENCE_DI_TOKEN_CONSTANT)
    private readonly referenceRepository: ReferenceOutboundPort,
  ) {}

  async execute(
    command: PostStoryBoardReferenceDto,
  ): Promise<
    Result<boolean, ReferNotExistsError | InternalServerErrorException>
  > {
    const res = await this.referenceRepository.create(command);
    if (!res.id) return Err(new ReferNotExistsError());
    return Ok(!!res.id);
  }
}
