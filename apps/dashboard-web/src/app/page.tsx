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
      <div></div>
      <ClientTest />
    </div>
  );
  // return <div>ㅇㅇㅇ</div>;
}
