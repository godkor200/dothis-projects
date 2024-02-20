import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
          ? 'localhost'
          : 'api.dothis.kr'
      }/v1/auth/google-redirect`,
      /**
       * 이 콜백 url 부분은 프로덕션/데브 부분이 나눠져야합니다.
       * 배포시에 앞단 뒷단 같은 도메인을 갖게 된다면 콜백 url  api.dothis.kr 로 바꿔야합니다.
       */

      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube.readonly',
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
    // YouTube Data API 호출
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: 'id',
          mine: true,
          access_token: accessToken,
        },
      },
    );

    const channelId = response.data.items ? response.data.items[0].id : null;

    const info = {
      id: Number(id),
      channelId,
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
