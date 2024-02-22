import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('weekly_views_202401')
export class WeeklyHitsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranking', type: 'int', nullable: true })
  ranking: number;

  @Column({ name: 'keyword', type: 'varchar', length: 30, nullable: true })
  keyword: string;

  @Column({ name: 'category', type: 'varchar', length: 30, nullable: true })
  category: string;

  @Column({ name: 'weekly_views', type: 'bigint', nullable: true })
  weeklyViews: number;

  @Column({ name: 'video_count', type: 'int', nullable: true })
  videoCount: number;

  @Column({ name: 'competitive', type: 'float', nullable: true })
  competitive: number;

  @Column({ name: 'mega_channel', type: 'int', nullable: true })
  megaChannel: number;

  @Column({ name: 'changes', type: 'int', nullable: true })
  changes: number;

  @Column({ name: 'YEAR', type: 'int', nullable: true })
  year: number;

  @Column({ name: 'MONTH', type: 'int', nullable: true })
  month: number;

  @Column({ name: 'DAY', type: 'int', nullable: true })
  day: number;
}
