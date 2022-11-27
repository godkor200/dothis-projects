import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subscribe' })
export class Subscribe {
  @PrimaryGeneratedColumn({ name: 'sub_id' })
  subId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'sub_price' })
  subPrice: number;

  @Column({ name: 'sub_status' })
  subStatus: boolean;

  @Column({ name: 'sub_start' })
  subStart: Date;

  @Column({ name: 'sub_end' })
  subEnd: Date;

  @Column({ name: 'update_at' })
  updateAt: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
