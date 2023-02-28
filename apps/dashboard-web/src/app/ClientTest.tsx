'use client';

import { apiClient } from '@/utils/apiClient';

export default function clientTest() {
  // const { data, isLoading } = apiClient.auth.getVerifyToken(['verifyTokenGet']);
  // if (!isLoading) console.log('data', data);

  return (
    // <div>{!isLoading && <p>current UserToken: {String(data?.body)}</p>}</div>
    <div>clientTest</div>
  );
}
