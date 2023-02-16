import { signIn } from 'next-auth/react';

export const youtubeSignIn = () =>
  signIn('youtube', {
    // 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
    callbackUrl: '/api/auth/creator',
  });
