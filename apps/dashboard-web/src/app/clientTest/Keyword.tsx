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

  const { data: test } = apiClient.auth.getOwnInfo.useQuery(['my']);
  console.log(test);
  return (
    <>
      <div>
        {/* {!isLoading && <p>current userData: {String(body.relWords)}</p>} */}
      </div>
      <div>{data?.body.relWords}clientTest</div>
    </>
  );
}
