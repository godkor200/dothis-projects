import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSubscriberViewAnalysisDto } from '@Apps/modules/video/application/dtos/get-subscriber-view-analysis.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { SUBSCRIBER_VIEW_ANALYSIS_DO_TOKEN } from '@Apps/modules/hits/hits.di-token.contants'; // 실제 DI 토큰 대체
import { SubscriberViewAnalysisOutboundPort } from '@Apps/modules/video/domain/ports/subscriber-view-analysis.outbound.port'; // 실제 포트와 경로 대체
import { SubscriberViewAnalysisError } from '@Apps/modules/video/domain/events/video.error'; // 실제 오류 클래스 대체

export type TSubscriberViewAnalysisResult = {
  section: string;
  from: number;
  to: number;
  count: number;
  totalVideoViews: number;
};

export type TGetSubscriberViewAnalysisRes = Result<
  TSubscriberViewAnalysisResult[],
  SubscriberViewAnalysisError
>;

@QueryHandler(GetSubscriberViewAnalysisDto)
export class SubscriberViewAnalysisService
  implements
    IQueryHandler<GetSubscriberViewAnalysisDto, TGetSubscriberViewAnalysisRes>
{
  constructor(
    @Inject(SUBSCRIBER_VIEW_ANALYSIS_DO_TOKEN)
    private readonly subscriberViewAnalysisAdapter: SubscriberViewAnalysisOutboundPort,
  ) {}

  async execute(
    query: GetSubscriberViewAnalysisDto,
  ): Promise<TGetSubscriberViewAnalysisRes> {
    try {
      const res = await this.subscriberViewAnalysisAdapter.execute({
        search: query.search,
        related: query.related,
        to: query.to,
      });

      if (res.isOk()) {
        const resUnwrap = res.unwrap();
        return Ok(
          resUnwrap.map((e) => ({
            section: e.key,
            from: e.from,
            to: e.to,
            count: e.docCount,
            totalVideoViews: e.totalVideoViews,
          })),
        );
      } else {
        return Err(new SubscriberViewAnalysisError('Data not found'));
      }
    } catch (e) {
      return Err(new SubscriberViewAnalysisError('Internal error occurred'));
    }
  }
}
