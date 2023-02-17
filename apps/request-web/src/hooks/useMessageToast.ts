import type { Message } from '@dothis/share';
import { standaloneToast, ToastBox } from '@dothis/share';
import { useEffect } from 'react';

const useMessageToast = (message?: Message) => {
  useEffect(() => {
    if (message) {
      standaloneToast.toast(ToastBox.getMessageOptions(message));
    }
  }, [message]);
};

export default useMessageToast;
