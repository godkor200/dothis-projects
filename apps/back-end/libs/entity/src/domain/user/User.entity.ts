import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_email' })
  userEmail: string;

  @Column({ name: 'channel_id' })
  channelId: number;

  @Column({ name: 'token_refresh' })
  tokenRefresh: string;

  @Column({ name: 'token_expires' })
  tokenExpires: string;

  @Column({ name: 'token_access' })
  tokenAccess: string;

  @Column({ name: 'agree_promotion' })
  agreePromotion: string;

  @Column({ name: 'plan' })
  plan: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'is_admin' })
  status: string;

  @Column({ name: 'date_sign_in' })
  dateSignIn: Date;
}
