import '@emotion/react';

import type { PrismaClient } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

import type { Message } from '@/lib/dto/Message';

declare const global: Global & { prisma?: PrismaClient };

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user'];
  }
}

declare module '@emotion/react' {
  export interface Theme {
    // 몰라서 일단 any로 함
    spacing: any;
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    message?: Message | undefined;
  }
}
