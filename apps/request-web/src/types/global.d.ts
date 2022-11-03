import '@emotion/react';

import type {PrismaClient} from '@dothis/share/generated/prisma-client'
import type { DefaultSession } from 'next-auth';

import type { Message } from '@/lib/models/Message';


declare const global: Global & { prisma?: PrismaClient };

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

declare module 'iron-session' {
  interface IronSessionData {
    message?: Message | undefined;
  }
}