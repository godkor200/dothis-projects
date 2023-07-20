'use client';

import { apiClient } from '@/utils/apiClient';

export default function Keyword() {
  const { data, isLoading } = apiClient.relwords.getRelWords.useQuery(['rel'], {
    params: {
      keyword: '손흥민',
    },
  });

  console.log(isLoading);
  console.log(data);

  return (
    <>
      <div>
        {/* {!isLoading && <p>current userData: {String(body.relWords)}</p>} */}
      </div>
      <div>{data?.body.relWords}clientTest</div>
    </>
  );
}
