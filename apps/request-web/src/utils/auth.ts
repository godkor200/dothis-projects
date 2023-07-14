import { signIn } from 'next-auth/react';

import { ToastBox } from '@/components/ui/ToastBox';

export const youtubeSignIn = () =>
  signIn('youtube', {
    // 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
    callbackUrl: '/api/jwt/creator',
  }).then((res) => {
    ToastBox.successToast('크리에이터 등록이 완료되었습니다.');
    console.log('res', res);
  });
