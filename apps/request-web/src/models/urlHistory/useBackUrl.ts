import type { NextjsUrl } from '@dothis/ui/src/types/common';
import { useRouter } from 'next/router';

import useUrlHistoryStore from '@/models/urlHistory/useUrlHistoryStore';

type UseBackUrlOpt = {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
};

// @parameter fallbackUrl  뒤로가기가 두디스 사이트내가 아닐 경우 fallbackUrl로 이동
export function useBackUrl() {
  const router = useRouter();
  const historyStore = useUrlHistoryStore();
  const prevUrl = historyStore.getPrevUrl();

  return {
    backPush: (fallbackUrl: NextjsUrl, opt?: UseBackUrlOpt) =>
      router.push(prevUrl ?? fallbackUrl, undefined, opt),
    backReplace: (fallbackUrl: NextjsUrl, opt?: UseBackUrlOpt) =>
      router.replace(prevUrl ?? fallbackUrl, undefined, opt),
  };
}
