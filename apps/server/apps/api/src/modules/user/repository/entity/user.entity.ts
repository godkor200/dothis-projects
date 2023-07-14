import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Membership } from 'apps/api/src/config/database/domain/entities/membership/membership.entity';
import { UserInfoCommandDto } from '@Apps/common/auth/v1/commands/google-login-redirect/google-login-redirect.service';
import { ChannelEntity } from 'apps/api/src/modules/channel/repository/entity/channel.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
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

  // @OneToMany(
  //   (type) => UserChannelData,
  //   (userChanelData) => userChanelData.userId,
  // )
  // UserChannelData: UserChannelData[];

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
