import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthApiService } from '@Apps/api/src/auth/AuthApi.service';
import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from '@Libs/entity/src/models/user/user.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authApiService: AuthApiService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${
        process.env.NODE_ENV === 'development'
          ? 'localhost:8080'
          : 'api.dothis.world'
      }/v1/auth/google-redirect`,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const user: UserDto = {
      userId: Number(id),
      userEmail: emails[0].value,
      tokenAccess: accessToken,
      tokenRefresh: refreshToken,
    };
    const res = await this.authApiService.validateUser(user);
    done(null, res);
  }
}
