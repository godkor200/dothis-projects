import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Membership } from '@Apps/modules/membership/domain/membership.entity';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { ChannelEntity } from '@Apps/modules/channel/repository/entity/channel.entity';

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

  @Column({ name: 'personalization_tag' })
  personalizationTag: string;

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
