import { apiClient } from '@/utils/apiClient';

import ClientTest from './ClientTest';

export function getData() {
  return apiClient.getUsers();
}

export default async function RootPage() {
  const data = await getData();
  return (
    <div>
      {data.map((d) => (
        <p key={d.id}>
          users: {d.id} {d.name}
        </p>
      ))}
      <ClientTest />
    </div>
  );
  // return <div>ㅇㅇㅇ</div>;
}
