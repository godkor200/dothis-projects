import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryIssueVideoDto } from '@Apps/modules/video/application/dtos/find-category-issue-video.dto';
import { VIDEO_CATEGORY_ADAPTER_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoCategoryOutboundPort } from '@Apps/modules/video/domain/ports/video.category.outbound.port';
import { Inject } from '@nestjs/common';
import { ICategoryIssueVideo } from '@Apps/modules/video/application/dtos/video.res';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoHistoryNotFoundError } from '@Apps/modules/video-history/domain/events/video_history.err';

export type TCategoryIssueVideo = Result<
  ICategoryIssueVideo[],
  VideoHistoryNotFoundError
>;

@QueryHandler(FindCategoryIssueVideoDto)
export class FindCategoryIssueVideoQueryHandler
  implements IQueryHandler<FindCategoryIssueVideoDto, TCategoryIssueVideo>
{
  constructor(
    @Inject(VIDEO_CATEGORY_ADAPTER_DI_TOKEN)
    private readonly findIssueCategoryService: VideoCategoryOutboundPort,
  ) {}

  async execute(
    query: FindCategoryIssueVideoDto,
  ): Promise<TCategoryIssueVideo> {
    try {
      const res = await this.findIssueCategoryService.execute(query);

      if (res.isOk()) {
        // 비디오 데이터를 원하는 형식으로 변환
        const result: ICategoryIssueVideo[] = res.unwrap().map((ele) => ({
          videoId: ele.video_id,
          videoViews: ele.video_views,
          videoTitle: ele.video_title,
          videoPublished: ele.video_published,
          avgViews: ele.avgViews,
          channelName: ele.channel_name,
        }));

        return Ok(result);
      }

      // 오류가 발생한 경우 처리
      return Err(res.unwrapErr());
    } catch (error) {
      // 예외 상황 처리
      return Err(new VideoHistoryNotFoundError());
    }
  }
}
