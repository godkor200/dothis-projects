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
          : 'api.dothis.kr'
      }/v1/auth/google-redirect`,
      /**
       * 이 콜백 url 부분은 프로덕션/데브 부분이 나눠져야합니다.
       * 배포시에 앞단 뒷단 같은 도메인을 갖게 된다면 콜백 url  api.dothis.kr 로 바꿔야합니다.
       */
      //   `http${
      //   process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
      //     ? ''
      //     : 's'
      // }://${
      //   process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
      //     ? 'localhost:3666'
      //     : 'api.dothis.kr'
      // }/v1/jwt/google-redirect`,

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
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken,
    });
  }
}
