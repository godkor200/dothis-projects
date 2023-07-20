'use client';

import { z } from 'zod';

import { apiClient } from '@/utils/apiClient';

export default function clientTest() {
  const { data, isLoading } = apiClient.user.getUser.useQuery(['user'], {
    params: {
      id: '1',
    },
    query: { search: 'zzzz' },
  });

  if (!isLoading) console.log('data', data);

  return (
    <>
      <div>{!isLoading && <p>current userData: {String(data?.body)}</p>}</div>
      <div>clientTest</div>
    </>
  );
}
