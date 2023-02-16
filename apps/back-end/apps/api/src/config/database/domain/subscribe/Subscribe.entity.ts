import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@Apps/api/src/config/database/domain/user/User.entity';

@Entity({ name: 'subscribe' })
export class Subscribe {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

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

  @ManyToOne((type) => User, (user) => user.UserChannelData)
  @JoinColumn({ name: 'userId' })
  User: User;
}
