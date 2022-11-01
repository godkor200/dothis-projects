import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useUrlHistoryStore from '@/models/urlHistory/useUrlHistoryStore';

let init = false;
export function useUrlHistoryEvent() {
  const router = useRouter();
  const historyStore = useUrlHistoryStore();

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean },
    ) => {
      if (!shallow) historyStore.push(url);
    };
    if (!init) {
      // @ts-ignore
      window.router = router;
      historyStore.push(router.asPath);
      init = true;
    }

    router.beforePopState(() => {
      historyStore.shift();
      return true;
    });

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);
}
