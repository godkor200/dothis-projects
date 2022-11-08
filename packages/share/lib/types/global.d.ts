import '@emotion/react';

import type { DefaultSession } from 'next-auth';

import type { Index } from '../../lib/models/Message/Message';

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
    message?: Index | undefined;
  }
}

/// <reference path="../../../../types/theme.d.ts" />
/// <reference path="../../../../types/nodeEnv.d.ts" />
