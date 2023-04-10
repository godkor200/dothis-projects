import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserChannelData } from '@Apps/config/database/domain/entities/UserChannelData/UserChannelData.entity';
import { Membership } from '@Apps/config/database/domain/entities/membership/membership.entity';
import { ChannelEntity } from '@Apps/config/database/domain/entities/channel/channel.entity';
import { UserInfoCommandDto } from '@Apps/modules/auth/v1/commands/google-login-redirect/google-login-redirect.service';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_email' })
  userEmail: string;

  @Column({ name: 'channel_id' })
  channelId: string;

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

  @OneToMany((type) => Membership, (Membership) => Membership.userId)
  Membership: Membership[];

  @OneToMany((type) => ChannelEntity, (channel) => channel.user)
  channel: ChannelEntity[];

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
