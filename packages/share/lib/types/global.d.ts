import type { DefaultSession } from 'next-auth';

import type { Message } from '../models';

declare module 'iron-session' {
  interface IronSessionData {
    message?: Message | undefined;
  }
}
