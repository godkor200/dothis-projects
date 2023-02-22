import { useSession } from 'next-auth/react';

import Login from '@/components/contents/Login';
import { ToastBox } from '@/components/ui/ToastBox';

export default function useMustLoginFirst() {
  const { data } = useSession();

  return (fn: () => void) => {
    if (!data?.user) {
      ToastBox.errorToast('로그인이 필요합니다.');
      Login.openModal();
      return;
    }
    return fn();
  };
}
