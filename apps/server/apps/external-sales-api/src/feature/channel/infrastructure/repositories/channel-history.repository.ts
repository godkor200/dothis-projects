import { ChannelHistoryRepositoryPort } from '@ExternalApps/feature/channel/domain/port/channel-history.repository.port';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
export interface VideoDataInsertData {
  channel_id: string;
  channel_total_videos: number;
  channel_subscribers: number;
  channel_average_views: number;
  channel_total_views: number;

  year: number; // 연도
  month: number; // 월
  day: number; // 일
}
@Injectable()
export class ChannelHistoryRepository implements ChannelHistoryRepositoryPort {
  constructor(
    @InjectEntityManager('onPromisesMysql')
    private readonly manager: EntityManager,
  ) {}

  async insert(data: VideoDataInsertData): Promise<boolean> {
    try {
      // 날짜에서 년과 월 추출
      const month = data.month.toString().padStart(2, '0');

      // 테이블명 생성
      const tableName = `channel_history_${data.year}${month}`;

      // 쿼리 실행
      await this.manager.query(
        `INSERT INTO ${tableName} (channel_id, channel_total_videos, channel_subscribers, channel_average_views, channel_total_views, year, month, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.channel_id,
          data.channel_total_videos,
          data.channel_subscribers,
          data.channel_average_views,
          data.channel_total_views,
          data.year,
          data.month,
          data.day,
        ],
      );

      // 삽입이 성공하면 true 반환
      return true;
    } catch (error) {
      // 삽입이 실패하면 false 반환하거나 에러를 처리할 수 있습니다
      console.error('Error inserting data: ', error);
      return false;
    }
  }
}
