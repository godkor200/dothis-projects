import Landing from '@/components/Landing';
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
  return <Landing />;
}
