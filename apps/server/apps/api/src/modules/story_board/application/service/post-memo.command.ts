import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostStoryBoardMemoDto } from '@Apps/modules/story_board/interfaces/dtos';
import { MemoEntity } from '@Apps/modules/story_board/domain/entities/memo.entity';
import { MemoNotExistsError } from '@Apps/modules/story_board/domain/errors';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { MEMO_DI_TOKEN_CONSTANT } from '@Apps/modules/story_board/constants/memo.di-token.constant';
import { MemoOutboundPort } from '@Apps/modules/story_board/domain/ports/outbound/memo.outbound';
import { Err, Ok, Result } from 'oxide.ts';

@CommandHandler(PostStoryBoardMemoDto)
export class PostMemoCommand
  implements
    ICommandHandler<
      PostStoryBoardMemoDto,
      Result<MemoEntity, MemoNotExistsError | InternalServerErrorException>
    >
{
  constructor(
    @Inject(MEMO_DI_TOKEN_CONSTANT)
    private readonly memoRepository: MemoOutboundPort,
  ) {}

  async execute(
    command: PostStoryBoardMemoDto,
  ): Promise<
    Result<MemoEntity, MemoNotExistsError | InternalServerErrorException>
  > {
    const res = await this.memoRepository.create(command);
    if (!res.id) return Err(new MemoNotExistsError());
    return Ok(res);
  }
}
