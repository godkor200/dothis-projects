import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUrlHistoryStore from '@/models/urlHistory/useUrlHistoryStore';

export function useUrlHistoryEvent() {
  const [isInit, setIsInit] = useState(false);
  const router = useRouter();
  const historyStore = useUrlHistoryStore();

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean },
    ) => {
      if (!shallow) historyStore.push(url);
    };
    if (!isInit) {
      // @ts-ignore
      window.router = router;
      historyStore.push(router.asPath);
      setIsInit(true);
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
