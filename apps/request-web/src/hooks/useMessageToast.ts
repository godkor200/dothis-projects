import type { Message } from '@dothis/share';
import { useEffect } from 'react';

import { ToastBox } from '@/components/ui/ToastBox';
import { standaloneToast } from '@/models/toast';

const useMessageToast = (message?: Message) => {
  useEffect(() => {
    if (message) {
      standaloneToast.toast(ToastBox.getMessageOptions(message));
    }
  }, [message]);
};

export default useMessageToast;
