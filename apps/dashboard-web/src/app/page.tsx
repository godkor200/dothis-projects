import { apiClient } from '@/utils/apiClient';

import ClientTest from './ClientTest';

// export function getData() {
//   return apiClient.user.verifyAccessTokenPost.mutation({
//     body: {
//       message: 'hi',
//     },
//   });
// }

export default async function RootPage() {
  // const data = await getData();
  return (
    <div>
    메인 크기만큼 늘어납니다
    </div>
  );
}
