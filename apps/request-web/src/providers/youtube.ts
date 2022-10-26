import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';
import type { GoogleProfile } from 'next-auth/providers/google';

export interface Google extends Record<string, any> {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export default function YoutubeProvider<P extends GoogleProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: 'youtube',
    name: 'Youtube',
    type: 'oauth',
    version: '2.0',
    wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
    authorization: {
      params: {
        scope:
          'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
      },
    },
    idToken: true,
    checks: ['pkce', 'state'],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    options,
  };
}
