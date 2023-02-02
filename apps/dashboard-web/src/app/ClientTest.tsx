'use client';

import { apiClient } from '@/utils/apiClient';

export default function clientTest() {
  const { data, isLoading } = apiClient.user.verifyTokenGet.useQuery([
    'verifyTokenGet',
  ]);
  if (!isLoading) console.log('data', data);

  return (
    <div>{!isLoading && <p>current UserToken: {String(data?.body)}</p>}</div>
  );
}
