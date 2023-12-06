import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TRankRes } from '@dothis/dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { FindRelAdapter } from '@Apps/modules/rel-words/interface/find-rel.adapter';
import { RankRelQueryDto } from '@Apps/modules/rel-words/queries/v1/rank-rel/rank-rel.http.controller';
import { Err, Result } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/rel-words/domain/relwords.errors';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { IFindVideoIDAndChannelIdRes } from '@Apps/modules/video/interface/find-video.os.res';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';

@QueryHandler(RankRelQueryDto)
export class RankRelQueryHandler
  implements
    IQueryHandler<RankRelQueryDto, Result<TRankRes[], RelwordsNotFoundError>>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelAdapter,

    @Inject(VIDEO_OS_DI_TOKEN)
    private readonly video: VideoServicePort,
  ) {}

  /**
   * 1. mysql 에서 탐색어에서 연관어 받아오기
   * 2. 탐색어 + 연관어 조합으로 인덱스 클러스터 별로 한꺼번에 모아서 가져오기
   * 3. 탐색어 + 연관어 조합으로 가져온 평균 기대조회수 계산해서 결과 배열에 푸쉬
   * 4. 결과 리턴
   * @param query
   */
  async execute(
    query: RankRelQueryDto,
  ): Promise<Result<TRankRes[], RelwordsNotFoundError>> {
    const relWords = await this.relWordsRepository.findOneByKeyword(
      query.keyword,
    );
    if (!relWords) return Err(new RelwordsNotFoundError());
    const relWordsArr = relWords.data.relWords.split(',');
    await this.video.findVideosWithMultipleIndex<IFindVideoIDAndChannelIdRes>({
      keyword: query.keyword,
      relWord: relWordsArr[0],
      data: [VIDEO_DATA_KEY.VIDEO_ID, VIDEO_DATA_KEY.CHANNEL_ID],
      cluster: relWords.data.cluster.split(','),
    });
  }
}
