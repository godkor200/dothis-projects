import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDailyViewsAdapter } from '../../../interface/find-daily-views.adapter';
import { DAILY_VIEWS_DI_TOKEN } from '@Apps/modules/daily_views/constants/daily-views.di-token.contants';
import { Inject } from '@nestjs/common';
import { VIDEO_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoAdapter } from '@Apps/modules/video/interface/find-video.adapter';
import { DailyViewsEntity } from '@Apps/modules/daily_views/repository/entity/daily-views.entity';

export class FindDailyViewsQuery {
  readonly relationKeyword: string;

  readonly from: Date;

  readonly to: Date;

  constructor(props: FindDailyViewsQuery) {
    this.relationKeyword = props.relationKeyword;
    this.from = props.from;
    this.to = props.to;
  }
}

@QueryHandler(FindDailyViewsQuery)
export class FindDailyViewsQueryHandler
  implements IQueryHandler<FindDailyViewsQuery, DailyViewsEntity[]>
{
  @Inject(DAILY_VIEWS_DI_TOKEN.FIND)
  private readonly dailyViews: FindDailyViewsAdapter;

  @Inject(VIDEO_DI_TOKEN.FIND_BY_VIDEO_ID)
  private readonly video: VideoAdapter;

  async execute(query: FindDailyViewsQuery): Promise<DailyViewsEntity[]> {
    const videoIdx = await this.video.findManyVideo(query.relationKeyword);

    return await this.dailyViews.findDailyView(videoIdx, query.from, query.to);
  }
}
