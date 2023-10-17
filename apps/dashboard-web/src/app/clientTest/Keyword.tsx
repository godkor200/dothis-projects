'use client';

import { apiClient } from '@/utils/apiClient';

export default function Keyword() {
  const { data, isLoading } = apiClient(1).relwords.getRelWords.useQuery(
    ['rel'],
    {
      params: {
        keyword: '손흥민',
      },
    },
  );

  console.log(isLoading);
  console.log(data);

  const { data: test } = apiClient(1).auth.getOwnInfo.useQuery(['my']);
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
