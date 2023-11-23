'use client';

import { useRouter } from 'next/navigation';

export default function LoginRedirectError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => router.push('/auth')}>
          다시 로그인하러가기
        </button>
      </body>
    </html>
  );
}
