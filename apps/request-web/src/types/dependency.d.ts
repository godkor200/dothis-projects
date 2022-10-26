import '@emotion/react';

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { id?: string | null } & DefaultSession['user'];
  }
}

declare module '@emotion/react' {
  export interface Theme {
    // 몰라서 일단 any로 함
    spacing: any;
  }
}
