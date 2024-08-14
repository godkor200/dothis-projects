import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  CrawledVideoRepositoryDao,
  CrawledVideoRepositoryRes,
  ICrawledVideoRepositoryPort,
  ICrawledVideoRepositoryRes,
} from '@ExternalApps/feature/crawler/domain/port/crawled-video.repository.port';
import { Err, Ok } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';

export class CrawledVideoRepository implements ICrawledVideoRepositoryPort {
  constructor(
    @InjectEntityManager('onPromisesMysql')
    private readonly manager: EntityManager,
  ) {}

  async get(
    dao: CrawledVideoRepositoryDao,
  ): Promise<CrawledVideoRepositoryRes> {
    const { videoIds, year, month, day } = dao;
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const prevDayStr = (day - 1).toString().padStart(2, '0');

    const videoIdList = videoIds.map((id) => `'${id}'`).join(',');

    let query = `
      SELECT vds.*, cd.*, ch.channel_average_views, ch.channel_subscribers, ch.channel_total_views, ch.channel_total_videos, vhs.video_views, vhs.video_likes, vhs.video_comments, vhs.video_performance, vhs.year, vhs.month, vhs.day
      FROM video_data_shorts vds
      INNER JOIN channel_data cd ON vds.channel_id = cd.channel_id
      INNER JOIN channel_history_${year}${monthStr} ch ON vds.channel_id = ch.channel_id AND ch.day BETWEEN ${prevDayStr} AND ${dayStr}
      INNER JOIN video_history_shorts_${year}${monthStr} vhs ON vds.video_id = vhs.video_id AND vhs.day BETWEEN ${prevDayStr} AND ${dayStr}
      WHERE vds.video_id IN (${videoIdList})
      GROUP BY vds.video_id, vhs.year, vhs.month, vhs.day`;

    if (day === 1) {
      const prevMonthDate = new Date(year, month - 1, 0); // 이전 월의 마지막 날 계산
      const prevMonth = (prevMonthDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const prevMonthLastDay = prevMonthDate
        .getDate()
        .toString()
        .padStart(2, '0');

      const prevYearMonth = prevMonthDate.getFullYear().toString() + prevMonth;

      query += `
      UNION
      SELECT vds.*, cd.*, ch.channel_average_views, ch.channel_subscribers, ch.channel_total_views, ch.channel_total_videos, vhs.video_views, vhs.video_likes, vhs.video_comments, vhs.video_performance, vhs.year, vhs.month, vhs.day
      FROM video_data_shorts vds
      INNER JOIN channel_data cd ON vds.channel_id = cd.channel_id
      INNER JOIN channel_history_${prevYearMonth} ch ON vds.channel_id = ch.channel_id
      INNER JOIN video_history_shorts_${prevYearMonth} vhs ON vds.video_id = vhs.video_id
      WHERE vds.video_id IN (${videoIdList})
      AND vhs.day = ${prevMonthLastDay} 
      AND ch.day = ${prevMonthLastDay}
      GROUP BY vds.video_id, vhs.year, vhs.month, vhs.day`;
    }

    try {
      const res = await this.manager.query<ICrawledVideoRepositoryRes[]>(query);
      if (!res.length) Err(new VideoNotFoundException());
      return Ok(res);
    } catch (err) {
      return Err(err);
    }
  }
}
