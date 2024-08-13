import { VideoHistoryOutboundPort } from '@ExternalApps/feature/video/domain/port/video-history.outbound.port';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
export interface VideoDataInsertData {
  video_id: string; // 비디오 ID
  channel_id: string; // 채널 ID
  video_cluster: number; // 비디오 클러스터

  video_comments: number; // 비디오 댓글 수
  video_views: number; // 비디오 조회수
  video_likes: number; // 비디오 좋아요 수
  video_performance: number; // 비디오 성능 지표

  year: number; // 연도
  month: number; // 월
  day: number; // 일
}
@Injectable()
export class VideoHistoryRepository implements VideoHistoryOutboundPort {
  constructor(
    @InjectEntityManager('onPromisesMysql')
    private readonly manager: EntityManager,
  ) {}

  async insert(data: VideoDataInsertData): Promise<boolean> {
    try {
      const month = data.month.toString().padStart(2, '0');

      // 테이블명 생성
      const tableName = `video_history_shorts_${data.year}${month}`;

      // 쿼리 실행
      await this.manager.query(
        `INSERT INTO \`${tableName}\` (video_comments, video_views, video_likes, video_performance, video_cluster, video_id, year, month, day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.video_comments,
          data.video_views,
          data.video_likes,
          data.video_performance,
          data.video_cluster,
          data.video_id,
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
