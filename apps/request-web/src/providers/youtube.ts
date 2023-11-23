import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';
import type { GoogleProfile } from 'next-auth/providers/google';

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
