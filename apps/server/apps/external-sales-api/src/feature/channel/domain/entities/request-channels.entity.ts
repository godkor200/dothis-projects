import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'request_channel' }) // 테이블명은 'request_channel'로 설정
export class RequestChannelsEntity {
  @PrimaryColumn({ type: 'varchar', length: 48, name: 'channel_id' })
  channelId: string; // Primary Key

  @Column({ type: 'varchar', length: 20, name: 'client_id' })
  clientId: string; // Not Null

  @Column({ type: 'tinyint', default: 0, name: 'public_flag' })
  publicFlag: number; // Not Null, default 값 0 허브 안에서 공개/비공개 설정

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'update_date' })
  updateDate: Date; // Null이 가능
}
