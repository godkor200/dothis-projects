import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserChannelData } from '@Libs/entity/src/domain/userChannelData/UserChannelData.entity';
import { Subscribe } from '@Libs/entity/src/domain/subscribe/Subscribe.entity';
import { Channel } from '@Libs/entity/src/domain/channel/Channel.entity';
import { UserInfoCommandDto } from '@Apps/api/src/auth/v1/commands/google-login-redirect/google-login-redirect.service';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_email' })
  userEmail: string;

  @Column({ name: 'channel_id' })
  channelId: number;

  @Column({ name: 'token_refresh' })
  tokenRefresh: string;

  @Column({ name: 'agree_promotion' })
  agreePromotion: string;

  @Column({ name: 'plan' })
  plan: string;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'date_sign_in' })
  dateSignIn: Date;

  @OneToMany(
    (type) => UserChannelData,
    (userChanelData) => userChanelData.userId,
  )
  UserChannelData: UserChannelData[];

  @OneToMany((type) => Subscribe, (subscribe) => subscribe.userId)
  Subscribe: Subscribe[];

  @OneToMany((type) => Channel, (channel) => channel.userId)
  Channel: Channel[];

  static create(user: UserInfoCommandDto) {
    const newUser = new User();
    newUser.userEmail = user.userEmail;
    return newUser;
  }
}

export class UserWithGoogleToken extends User {
  accessToken: string;
  refreshToken: string;
}
