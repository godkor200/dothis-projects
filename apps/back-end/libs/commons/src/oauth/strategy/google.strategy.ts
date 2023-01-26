import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http${
        process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
          ? ''
          : 's'
      }://${
        process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
          ? 'localhost:8080'
          : 'api.dothis.world'
      }/v1/auth/google-redirect`,

      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const info = {
      id: Number(id),
      userEmail: emails[0].value,
      tokenRefresh: null,
    };

    done(null, {
      ...info,
      goolgleAccessToken: accessToken,
      goolgleRefreshToken: refreshToken,
    });
  }
}
