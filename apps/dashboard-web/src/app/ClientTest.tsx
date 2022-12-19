'use client';

import { apiHooks } from '@/utils/apiClient';

export default function clientTest() {
  const d = apiHooks.useGetUser({ params: { id: 1 } });

  return (
    <div>
      current User: {d.data?.id} {d.data?.name}
    </div>
  );
}
