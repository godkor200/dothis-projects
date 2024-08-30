import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDurationLengthDto } from '@Apps/modules/video/application/dtos/get-duration-length.dto';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_DURATION_LENGTH_DO_TOKEN } from '@Apps/modules/video/video.di-token';
import { VideoDurationLengthOutboundPort } from '@Apps/modules/video/domain/ports/video.duration-length.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
export type TVideoDurationLengthResult = {
  section: string;
  from: number;
  to: number;
  count: number;
  totalVideoViews: number;
};
export type TGetDurationLengthRes = Result<
  TVideoDurationLengthResult[],
  VideoNotFoundError
>;

@QueryHandler(GetDurationLengthDto)
export class VideoDurationLengthService
  implements IQueryHandler<GetDurationLengthDto, TGetDurationLengthRes>
{
  constructor(
    @Inject(VIDEO_DURATION_LENGTH_DO_TOKEN)
    private readonly videoDurationLengthAdapter: VideoDurationLengthOutboundPort,
  ) {}

  async execute(query: GetDurationLengthDto): Promise<TGetDurationLengthRes> {
    try {
      const res = await this.videoDurationLengthAdapter.execute({
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
            count: e.doc_count,
            totalVideoViews: e.total_video_views,
          })),
        );
      }
    } catch (e) {
      return Err(e);
    }
  }
}
