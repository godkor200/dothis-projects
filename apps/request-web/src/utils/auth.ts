import { ToastBox } from '@dothis/share';
import { signIn } from 'next-auth/react';

export const youtubeSignIn = () =>
  signIn('youtube', {
    // 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
    callbackUrl: '/api/auth/creator',
  }).then((res) => {
    ToastBox.successToast('크리에이터 등록이 완료되었습니다.');
    console.log('res', res);
  });
