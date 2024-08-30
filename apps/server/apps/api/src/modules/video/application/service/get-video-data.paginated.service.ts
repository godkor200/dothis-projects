import { GetVideoDataPageServiceInboundPort } from '@Apps/modules/video/domain/ports/get-video-data-page.service.inbound.port';
import { GetVideoPaginatedPageSortDto } from '@Apps/modules/video/application/dtos/find-video-paging.req.dto';
import { TGetVideoPage } from '@Apps/modules/video/application/queries/v2/find-video-page.query-handler';
import { Inject } from '@nestjs/common';
import {
  VIDEO_DATA_ADAPTER_DI_TOKEN,
  VIDEO_PAGINAED_ADAPTER_DI_TOKEN,
} from '@Apps/modules/video/video.di-token';
import { IGetVideoPaginatedOutboundPort } from '@Apps/modules/video/domain/ports/video.paginated.outbound.port';
import { Err, Ok, Result } from 'oxide.ts';
import { VideoPaginatedDao } from '@Apps/modules/video/infrastructure/daos/video.paginated.dao';
import {
  VideoDataExtendVideoViews,
  VideoDataOutboundPort,
} from '@Apps/modules/video/domain/ports/video_data.outbound.port';

export class GetVideoDataPaginatedService
  implements GetVideoDataPageServiceInboundPort
{
  constructor(
    @Inject(VIDEO_PAGINAED_ADAPTER_DI_TOKEN)
    private readonly videoPaginatedAdapter: IGetVideoPaginatedOutboundPort,

    @Inject(VIDEO_DATA_ADAPTER_DI_TOKEN)
    private readonly videoDataAdapter: VideoDataOutboundPort,
  ) {}

  async execute(dto: GetVideoPaginatedPageSortDto): Promise<TGetVideoPage> {
    try {
      const videoPaginatedDao = new VideoPaginatedDao({
        search: dto.search,
        related: dto.related,
        from: dto.from,
        to: dto.to,
        sort: dto.sort,
        order: dto.order,
        limit: dto.limit,
        page: dto.page,
      });

      const videoIdsResult = await this.videoPaginatedAdapter.execute(
        videoPaginatedDao,
      );
      if (videoIdsResult.isErr()) {
        return Err(videoIdsResult.unwrapErr());
      }

      const videoIdsUnwrap = videoIdsResult.unwrap();
      const videoIds = videoIdsUnwrap.items.map((e) => e.video_id);
      const videosResult = await this.videoDataAdapter.execute(videoIds);
      if (videosResult.isErr()) {
        return Err(videosResult.unwrapErr());
      }

      const videosUnwrap = videosResult.unwrap();

      const mergedResults: VideoDataExtendVideoViews[] =
        videoIdsUnwrap.items.map((item) => {
          const videoDetails = videosUnwrap.find(
            (video) => video.video_id === item.video_id,
          );

          return {
            ...item,
            ...videoDetails,
          } as VideoDataExtendVideoViews;
        });

      const formattedResults = mergedResults.map((e) => ({
        channelId: e.channel_id,
        videoId: e.video_id,
        videoTitle: e.video_title,
        videoDescription: e.video_description,
        videoTags: e.video_tags,
        videoDuration: e.video_duration,
        videoPublished: new Date(e.video_published),
        videoCategory: e.video_category,
        videoInfoCard: !!e.video_info_card,
        videoWithAds: !!e.video_with_ads,
        videoEndScreen: !!e.video_end_screen,
        videoCluster: e.video_cluster,
        channelName: e.channel_name, // Fixed the property name assumption
        videoViews: e.video_views,
        crawledDate: new Date(e['@timestamp']),
      }));

      return Ok({
        data: formattedResults,
        total: videoIdsUnwrap.total,
      });
    } catch (e) {
      return Err(e);
    }
  }
}
